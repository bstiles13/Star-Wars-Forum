let express = require('express');
let router = new express.Router();
let path = require('path');
let axios = require('axios');
let moment = require('moment');
let Topic = require('../model/topic.js');
let Thread = require('../model/thread.js');
let Reply = require('../model/reply.js');

// Sends topics to homepage for display
router.get('/topics', (req, res) => {
    Topic.aggregate([
        {
            $lookup:
                {
                    from: "replies",
                    localField: "_id",
                    foreignField: "topic_id",
                    as: "replyHistory"
                }
        },
        {
            $lookup:
                {
                    from: "threads",
                    localField: "_id",
                    foreignField: "topic_id",
                    as: "threadHistory"
                }
        }
    ]).then(data => {
        res.json(data);
    }).catch(err => {
        throw err;
    })
});

router.get('/threads/:id?', (req, res) => {
    Topic.findOne({ order: req.params.id }).then(data => {
        Thread.find({ topic_id: data._id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    })
})

router.get('/replies/:id', (req, res) => {
    console.log('test', req.params.id);
    Reply.find({ thread_id: req.params.id }).then(data => {
        console.log('replies complete');
        res.json(data);
    }).catch(err => {
        throw err;
    })
})

router.get('/thread/:id', function (req, res) {
    var id = req.params.id;
    Thread.findOne({ _id: id }).then(data => {
        res.json(data);
    })
})

router.get('/topicdetail/:id', (req, res) => {
    Topic.findOne({ order: req.params.id }).then(data => {
        res.json(data);
    }).catch(err => {
        throw err;
    })
})

router.get('/articles', (req, res) => {
    let date = moment().subtract(40, 'days').format('YYYYMMDD');
    // let date = prevMonth.substring(0,5) + prevMonth.substring(6, 8)
    console.log('date', date);
    let query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=star+wars&begin_date=" + date + "&api-key=57828338a1d747908e089f87cc6a7a77"
    // Send GET request to New York Times and add resulting collection to "articles" object to be returned to browser
    axios.get(query).then(data => {
        // console.log('data', data.data);
        res.json(data.data.response);
    })
})

router.post('/newthread', (req, res) => {
    let newThread = req.body;
    newThread.poster = "Anonymous";
    Thread.create(newThread).then(data => {
        console.log('new thread success');
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
})

router.post('/newreply', (req, res) => {
    let newReply = req.body;
    newReply.poster = "Anonymous";
    console.log(newReply);
    if (newReply.quotedPoster != null) {
        newReply.message = '<div class="quote"><div class="quote-poster">Posted by ' + newReply.quotedPoster + '</div><div class="quote-body">' + newReply.quotedMessage + '</div></div><br/>' + newReply.message;
    }
    Reply.create(newReply).then(data => {
        console.log('new reply success');
        res.send(true);
    }).catch(err => {
        console.log(err);
    })
})

router.get('/lastpost/:id', (req, res) => {
    Reply.findOne({ topic_id: req.params.id }).then(data => {
        res.json(data);
    })
})

// Default route that sends HTML file to browser
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

module.exports = router;