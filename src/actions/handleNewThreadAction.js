import axios from 'axios';

export const handleNewThreadInput = (event) => {
    return {
        type: "HANDLE_NEW_THREAD",
        payload: {
            [event.target.name]: event.target.value
        }
    }
}

export const handleNewThreadId = (topicId) => {
    return function (dispatch) {
        axios.post('/topicid', { id: topicId }).then(data => {
            console.log(data);
            dispatch({
                type: "HANDLE_NEW_THREAD",
                payload: {
                    topic_id: data.data._id
                }
            })
        })
    }
}