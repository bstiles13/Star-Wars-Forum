import axios from 'axios';

export const toggleTopic = (id) => {
    return function (dispatch) {
        axios.get('/topicdetail/' + id).then(data => {
            dispatch({
                type: 'TOGGLE_TOPIC',
                payload: data.data
            })
        })
    }
}