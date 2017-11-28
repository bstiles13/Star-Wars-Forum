import axios from 'axios';

export const handleNewReplyInput = (event) => {
    return {
        type: "HANDLE_NEW_REPLY",
        payload: {
            [event.target.name]: event.target.value
        }
    }
}

export const handleNewReplyIds = (topicId, threadId) => {
    return function (dispatch) {
        axios.post('/topicid', { id: topicId }).then(data => {
            console.log(data);
            dispatch({
                type: "HANDLE_NEW_REPLY",
                payload: {
                    topic_id: data.data._id,
                    thread_id: threadId
                }
            })
        })
    }
}