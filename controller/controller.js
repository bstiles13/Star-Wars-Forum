let axios = require('axios');
let moment = require('moment');
let Topic = require('../model/topic.js');
let Thread = require('../model/thread.js');
let Reply = require('../model/reply.js');
let User = require('../model/user.js');

module.exports = {

    topics: (req, res) => {
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
    },
    
    threads: (req, res) => {
        Topic.findOne({ order: req.params.id }).then(data => {
            Thread.aggregate([
                {
                    $match: { topic_id: data._id }
                },
                {
                    $lookup:
                        {
                            from: "replies",
                            localField: "_id",
                            foreignField: "thread_id",
                            as: "history"
                        }
                }
            ]).then(data => {
                res.json(data);
            }).catch(err => {
                throw err;
            })
        })
    },
    
    replies: (req, res) => {
        Reply.find({ thread_id: req.params.id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },
    
    deleteReply: (req, res) => {
        Reply.remove({ _id: req.params.id }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    },
    
    thread: (req, res) => {
        console.log('getting thread');
        var id = req.params.id;
        Thread.findOne({ _id: id }).then(data => {
            console.log(data);
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    topic: (req, res) => {
        var id = req.params.id;
        Topic.findOne({ _id: id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },
    
    deleteThread: (req, res) => {
        Thread.remove({ _id: req.params.id }).then(data => {
            Reply.remove({ thread_id: req.params.id }).then(data => {
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(err => {
            res.json(err);
        });
    },
    
    topicDetail: (req, res) => {
        Topic.findOne({ order: req.params.id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },
    
    articles: (req, res) => {
        let date = moment().subtract(40, 'days').format('YYYYMMDD');
        let query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=star+wars&begin_date=" + date + "&api-key=57828338a1d747908e089f87cc6a7a77"
        // Send GET request to New York Times and add resulting collection to "articles" object to be returned to browser
        axios.get(query).then(data => {
            res.json(data.data.response);
        })
    },
    
    newThread: (req, res) => {
        let newThread = req.body;
        Thread.create(newThread).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    },
    
    newReply: (req, res) => {
        let newReply = req.body;
        if (newReply.quotedPoster != null) {
            newReply.message = '<div class="quote"><div class="quote-poster">Posted by ' + newReply.quotedPoster + '</div><div class="quote-body">' + newReply.quotedMessage + '</div></div><br/>' + newReply.message;
        }
        Reply.create(newReply).then(data => {
            res.send(true);
        }).catch(err => {
            console.log(err);
        })
    },
    
    editThread: (req, res) => {
        Thread.update({ _id: req.body.id }, { title: req.body.title, message: req.body.message }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },
    
    editReply: (req, res) => {
        Reply.update({ _id: req.body.id }, { message: req.body.message }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },
    
    lastReply: (req, res) => {
        Reply.find().limit(1).sort({$natural:-1})
        .then(data => {
            console.log('data', data);
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    userCount: (req, res) => {
        User.find({}).then(data => {
            res.json({count: data.length})
        }).catch(err => {
            throw err;
        })
    },

    threadCount: (req, res) => {
        Thread.find({}).then(data => {
            res.json({count: data.length})
        }).catch(err => {
            throw err;
        })
    },

    replyCount: (req, res) => {
        Reply.find({}).then(data => {
            res.json({count: data.length})
        }).catch(err => {
            throw err;
        })
    },
    
    // this route is just used to get the user basic info
    getUser: (req, res, next) => {
        if (req.session.username) {
            return res.json({ user: req.session.username })
        } else {
            return res.json({ user: null })
        }
    },
    
    login: (req, res) => {
        User.authenticate(req.body.existingUsername, req.body.existingPassword, (error, user) => {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                req.session.username = null;
                res.send(false);
            } else {
                req.session.username = user.username;
                res.json(user);
            }
        });
    },
    
    guest: (req, res) => {
        req.session.username = 'Anonymous';
        res.json(req.session.username);
    },
    
    register: (req, res) => {
        const { newUsername, newPassword1 } = req.body
        // ADD VALIDATION
        User.findOne({ username: newUsername }, (err, userMatch) => {
            if (userMatch) {
                res.send(false);
            }
            const newUser = {
                username: newUsername,
                password: newPassword1
            }
            User.create(newUser).then(savedUser => {
                req.session.username = savedUser.username;
                res.json(savedUser)
            }).catch(err => {
                res.json(err)
            })
        })
    },
    
    logout: (req, res) => {
        if (req.session.username) {
            req.session.username = null;
            res.json({ user: req.session.username })
        } else {
            res.json({ msg: 'no user to log out!' })
        }
    }
    
}