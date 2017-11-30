import axios from 'axios';

export const getUser = () => {
    return function (dispatch) {
        axios.get('/getuser').then(data => {
            dispatch({
                type: "GET_USER",
                payload: data.data.user
            })
        })
    }
}

export const resetUser = () => {
    return {
        type: "RESET_USER",
        payload: null
    }
}