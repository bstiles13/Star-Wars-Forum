let express = require('express');
let router = new express.Router();
let path = require('path');
let controller = require('../controller/controller.js');


// Sends topics to homepage for display
router.get('/topics', controller.topics);

router.get('/threads/:id?', controller.threads);

router.get('/replies/:id', controller.replies);

router.get('/deletereply/:id', controller.deleteReply);

router.get('/thread/:id', controller.thread);

router.get('/topic/:id', controller.topic);

router.get('/deletethread/:id', controller.deleteThread);

router.get('/topicdetail/:id', controller.topicDetail);

router.get('/articles', controller.articles);

router.post('/newthread', controller.newThread);

router.post('/newreply', controller.newReply);

router.post('/editthread', controller.editThread);

router.post('/editreply', controller.editReply);

router.get('/lastreply', controller.lastReply);

router.get('/usercount', controller.userCount);

router.get('/threadcount', controller.threadCount);

router.get('/replycount', controller.replyCount);

// this route is just used to get the user basic info
router.get('/getuser', controller.getUser);

router.post('/login', controller.login);

router.get('/guest', controller.guest);

router.post('/register', controller.register);

router.get('/logout', controller.logout)

// // Default route that sends HTML file to browser
// router.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname + './build/index.html'));
// })

module.exports = router;