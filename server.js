// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./controller/routes.js');

// Server congfiguration and middleware
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/build"));
app.use("/", routes);

// MongoDB Settings
const target = "starwars_db";
const db = process.env.MONGODB_URI || "mongodb://localhost/" + target;

// MongoDB Connection
mongoose.connect(db, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("Successful MongoDB connection to " + target);
    }
});

// Start Express Server
app.listen(PORT, function () {
    console.log("Successful server connection on port " + PORT);
})