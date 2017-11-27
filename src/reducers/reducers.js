import { combineReducers } from 'redux';
import getArticlesReducer from './getArticlesReducer.js';
import getTopicsReducer from './getTopicsReducer.js';
import handleNewThread from './handleNewThread.js';

let reducers = combineReducers({
    articles: getArticlesReducer,
    topics: getTopicsReducer,
    newThread: handleNewThread
})

export default reducers;