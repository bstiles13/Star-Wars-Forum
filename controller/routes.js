let express = require('express');
let router = new express.Router();
let path = require('path');
let axios = require('axios');
let moment = require('moment');
let Topic = require('../model/topic.js');

// Sends topics to homepage for display
router.get('/topics', (req, res) => {
    Topic.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        throw err;
    })
});

router.get('/threads/:id', (req, res) => {
    console.log(req.params.id);
    Thread.find({}).then(data => {

    })
})

router.post('/topicid', (req, res) => {
    console.log(req.body.id)
    Topic.findOne({order: req.body.id}).then(data => {
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
    newThread.user = "Anonymous";    
    console.log(newThread);
    Thread.create(newThread).then(data => {
        res.send(true);
    }).catch(err => {
        console.log(err);
    })
})

// Default route that sends HTML file to browser
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

module.exports = router;