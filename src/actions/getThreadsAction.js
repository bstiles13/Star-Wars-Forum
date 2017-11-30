import axios from 'axios';

export const getThreads = (id) => {
    return function (dispatch) {
        axios.get('/threads/' + id).then(data => {
            dispatch({
                type: "GET_THREADS",
                payload: data.data
            })
        })
    }
}