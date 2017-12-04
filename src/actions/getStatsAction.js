import axios from 'axios';

export const getStats = () => {
    return function (dispatch) {
        axios.get('/usercount').then(data => {
            dispatch({
                type: 'GET_STATISTICS',
                payload: {
                    userCount: data.data.count
                }
            })
        })
        axios.get('/threadcount').then(data => {
            dispatch({
                type: 'GET_STATISTICS',
                payload: {
                    threadCount: data.data.count
                }
            })
        })
        axios.get('/replycount').then(data => {
            dispatch({
                type: 'GET_STATISTICS',
                payload: {
                    replyCount: data.data.count
                }
            })
        })
        axios.get('/lastreply').then(data => {
            dispatch({
                type: 'GET_STATISTICS',
                payload: { lastReply: data.data[0] }
            })
            axios.get('/thread/' + data.data[0].thread_id).then(data => {
                dispatch({
                    type: 'GET_STATISTICS',
                    payload: { lastThread: data.data }
                })
                axios.get('/topic/' + data.data.topic_id).then(data => {
                    dispatch({
                        type: 'GET_STATISTICS',
                        payload: { lastTopic: data.data }
                    })
                })
            })
        })
    }
}