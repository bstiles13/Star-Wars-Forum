import axios from 'axios';

export const getReplies = (id) => {
    console.log('got replies');    
    return function (dispatch) {
        axios.get('/replies/' + id).then(data => {
            dispatch({
                type: "GET_REPLIES",
                payload: data.data
            })
        })
    }
}