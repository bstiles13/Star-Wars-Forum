import axios from 'axios';

export const getThreads = (id) => {
    let query = id ? '/threads/' + id : '/threads';
    return function (dispatch) {
        axios.get(query).then(data => {
            console.log('got threads', data);
            dispatch({
                type: "GET_THREADS",
                payload: data.data
            })
        })
    }
}