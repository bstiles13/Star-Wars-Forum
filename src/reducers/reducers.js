import { combineReducers } from 'redux';
import getArticlesReducer from './getArticlesReducer.js';
import getTopicsReducer from './getTopicsReducer.js';


let reducers = combineReducers({
    articles: getArticlesReducer,
    topics: getTopicsReducer
})

export default reducers;