let express = require('express');
let router = new express.Router();
let path = require('path');

// Default route that sends HTML file to browser
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

module.exports = router;