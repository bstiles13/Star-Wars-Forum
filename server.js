// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
var session = require('express-session');

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
let dbConnection = mongoose.connection;

// Server congfiguration and middleware
const app = express();
const PORT = process.env.PORT || 3001;
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/build"));
app.use("/", routes);

// Start Express Server
app.listen(PORT, function () {
    console.log("Successful server connection on port " + PORT);
})