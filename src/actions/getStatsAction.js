import axios from 'axios';

export const getStats = () => {
    console.log('getting stats');
    return function (dispatch) {
        axios.get('/usercount').then(data => {
            console.log('got user count');
            dispatch({
                type: 'GET_STATISTICS',
                payload: {
                    userCount: data.data.count
                }
            })
        })
        axios.get('/threadcount').then(data => {
            console.log('got thread count');            
            dispatch({
                type: 'GET_STATISTICS',
                payload: {
                    threadCount: data.data.count
                }
            })
        })
        axios.get('/replycount').then(data => {
            console.log('got reply count');            
            dispatch({
                type: 'GET_STATISTICS',
                payload: {
                    replyCount: data.data.count
                }
            })
        })
    }
}