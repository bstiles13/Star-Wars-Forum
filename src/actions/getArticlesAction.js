import axios from 'axios';

export const getArticles = () => {
    return function (dispatch) {
        axios.get('/articles').then(data => {
            dispatch({
                type: 'GET_ARTICLES',
                payload: data.data.docs
            })
        })
    }
}