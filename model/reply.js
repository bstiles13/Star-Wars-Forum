const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let replySchema = new Schema({
    poster: String,
    message: String,
    thread_id: Number,
    topic_id: Number,    
    time_posted: {
        type: Date,
        default: Date.now
    }
});

let Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;