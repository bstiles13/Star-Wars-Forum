import axios from 'axios';

export const handleNewThread = (event, defaultTopic) => {
    return function (dispatch) {
        if (!defaultTopic) {
            dispatch({
                type: "HANDLE_NEW_THREAD",
                payload: {
                    [event.target.name]: event.target.value
                }
            })
        } else {
            axios.post('/topicid', { id: defaultTopic }).then(data => {
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
}