const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let threadSchema = new Schema({
    poster: String,
    title: String,
    message: String,
    topic_id: {
        type: mongoose.Schema.ObjectId
    },    
    time_posted: {
        type: Date,
        default: Date.now
    }
});

let Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;