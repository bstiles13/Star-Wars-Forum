let axios = require('axios');
let moment = require('moment');
let Topic = require('../model/topic.js');
let Thread = require('../model/thread.js');
let Reply = require('../model/reply.js');
let User = require('../model/user.js');

module.exports = {

    // Retrieves Star Wars articles from New York Times API dated within last month
    articles: (req, res) => {
        let date = moment().subtract(30, 'days').format('YYYY-MM-DD');
        let query = 'https://newsapi.org/v2/everything?q=star-wars&language=en&from=' + date + '&sortBy=relevancy&apiKey=7ec1b51db89c469fa7177a2f483243c8';
        // Send GET request to New York Times and add resulting collection to "articles" object to be returned to browser
        axios.get(query).then(data => {
            res.json(data.data);
        })
    },

    // Retrieves a single forum topic by ID
    topic: (req, res) => {
        var id = req.params.id;
        Topic.findOne({ _id: id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    // Retrieves a single forum topic by Order #
    topicDetail: (req, res) => {
        Topic.findOne({ order: req.params.id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    // Retrieves all forum topics for display on homepage
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

    // Retrieves a single thread by ID
    thread: (req, res) => {
        var id = req.params.id;
        Thread.findOne({ _id: id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    // Retrieves all threads by topic Order
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

    // Retrieves all replies by thread ID
    replies: (req, res) => {
        Reply.find({ thread_id: req.params.id }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    // Handles new thread
    newThread: (req, res) => {
        let newThread = req.body;
        Thread.create(newThread).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    },

    // Handles new reply
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

    // Handles thread update
    editThread: (req, res) => {
        Thread.update({ _id: req.body.id }, { title: req.body.title, message: req.body.message }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    // Handles reply update
    editReply: (req, res) => {
        Reply.update({ _id: req.body.id }, { message: req.body.message }).then(data => {
            res.json(data);
        }).catch(err => {
            throw err;
        })
    },

    // Handles reply delete
    deleteReply: (req, res) => {
        Reply.remove({ _id: req.params.id }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    },

    // Handles thread delete
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

    // Retrieves most recent post
    lastReply: (req, res) => {
        Reply.find().limit(1).sort({ $natural: -1 })
            .then(data => {
                res.json(data);
            }).catch(err => {
                throw err;
            })
    },

    // Retreives total number of users
    userCount: (req, res) => {
        User.find({}).then(data => {
            res.json({ count: data.length })
        }).catch(err => {
            throw err;
        })
    },

    // Retreives total number of threads
    threadCount: (req, res) => {
        Thread.find({}).then(data => {
            res.json({ count: data.length })
        }).catch(err => {
            throw err;
        })
    },

    // Retreives total number of replies
    replyCount: (req, res) => {
        Reply.find({}).then(data => {
            res.json({ count: data.length })
        }).catch(err => {
            throw err;
        })
    },

    // Retrieves user (if any) stored in express session
    getUser: (req, res, next) => {
        if (req.session.username) {
            return res.json({ user: req.session.username })
        } else {
            return res.json({ user: null })
        }
    },

    // Authenticates existing user
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

    // Sets express session user to Anonymous; guest login
    guest: (req, res) => {
        req.session.username = 'Anonymous';
        res.json(req.session.username);
    },

    // Registers new user and stores user in session if successful
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

    // Resets user session
    logout: (req, res) => {
        if (req.session.username) {
            req.session.username = null;
            res.json({ user: req.session.username })
        } else {
            res.json({ msg: 'no user to log out!' })
        }
    }

}