let express = require('express');
let router = new express.Router();
let path = require('path');
let Topic = require('../model/topic.js');

// Sends topics to homepage for display
router.get('/topics', (req, res) => {
    Topic.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        throw err;
    })
  });

// Default route that sends HTML file to browser
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

module.exports = router;