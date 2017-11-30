let express = require('express');
let router = new express.Router();
let path = require('path');
let controller = require('../controller/controller.js');

// API Routes //

// Retrieves Star Wars articles from New York Times API dated within last month
router.get('/articles', controller.articles);

// Retrieves a single forum topic by ID
router.get('/topic/:id', controller.topic);

// Retrieves a single forum topic by Order #
router.get('/topicdetail/:id', controller.topicDetail);

// Retrieves all forum topics for display on homepage
router.get('/topics', controller.topics);

// Retrieves a single thread by ID
router.get('/thread/:id', controller.thread);

// Retrieves all threads by topic Order
router.get('/threads/:id?', controller.threads);

// Retrieves all replies by thread ID
router.get('/replies/:id', controller.replies);

// EDITING //

// Handles new thread
router.post('/newthread', controller.newThread);

// Handles new reply
router.post('/newreply', controller.newReply);

// Handles thread update
router.post('/editthread', controller.editThread);

// Handles reply update
router.post('/editreply', controller.editReply);

// Handles reply delete
router.get('/deletereply/:id', controller.deleteReply);

// Handles thread delete
router.get('/deletethread/:id', controller.deleteThread);

// STATISTICS //

// Retrieves most recent post
router.get('/lastreply', controller.lastReply);

// Retreives total number of users
router.get('/usercount', controller.userCount);

// Retrieves total number of threads
router.get('/threadcount', controller.threadCount);

// Retrieves total number of replies
router.get('/replycount', controller.replyCount);

// LOGIN

// Retrieves user (if any) stored in express session
router.get('/getuser', controller.getUser);

// Authenticates existing user
router.post('/login', controller.login);

// Sets express session user to Anonymous; guest login
router.get('/guest', controller.guest);

// Registers new user and stores user in session if successful
router.post('/register', controller.register);

// Resets user session
router.get('/logout', controller.logout)

module.exports = router;