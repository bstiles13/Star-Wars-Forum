const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let replySchema = new Schema({
    poster: String,
    message: String,
    thread_id: String,
    topic_id: String,    
    time_posted: {
        type: Date,
        default: Date.now
    }
});

let Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;