import { combineReducers } from 'redux';
import getArticlesReducer from './getArticlesReducer.js';
import getTopicsReducer from './getTopicsReducer.js';
import getThreadsReducer from './getThreadsReducer.js';
import handleNewThread from './handleNewThread.js';

let reducers = combineReducers({
    articles: getArticlesReducer,
    topics: getTopicsReducer,
    threads: getThreadsReducer,
    newThread: handleNewThread
})

export default reducers;