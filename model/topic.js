const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let topicSchema = new Schema({
    order: Number,
    topic: String
});

let Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;