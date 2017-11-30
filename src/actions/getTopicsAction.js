import axios from 'axios';

export const getTopics = () => {
    return function (dispatch) {
        axios.get('/topics').then(data => {
            let topics = data.data;
            for (var i = 0; i < topics.length; i++) {
                if (topics[i].replyHistory.length > 0) {
                    let lastReply = topics[i].replyHistory[topics[i].replyHistory.length - 1];
                    let lastThread = topics[i].threadHistory.find(object => object._id === lastReply.thread_id);
                    topics[i].recent = {
                        title: lastThread.title,
                        poster: lastReply.poster,
                        time: lastReply.time_posted,
                        reply_id: lastReply._id,
                        thread_id: lastReply.thread_id
                    }
                } else {
                    topics[i].recent = null;
                }
            }
            dispatch({
                type: "GET_TOPICS",
                payload: topics
            })
        })
    }
}