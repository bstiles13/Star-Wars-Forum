import axios from 'axios';

export const getOneThread = (id) => {
    return function (dispatch) {
        axios.get('/thread/' + id).then(data => {
            console.log('one thread', data);
            dispatch({
                type: "GET_ONE_THREAD",
                payload: data.data
            })
        })
    }
}