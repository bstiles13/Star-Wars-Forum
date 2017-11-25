import axios from 'axios';

export const getTopics = () => {
    return function (dispatch) {
        axios.get('/topics').then(data => {
            // console.log(data.data);
            dispatch({
                type: "GET_TOPICS",
                payload: data.data
            })
        })
    }
}