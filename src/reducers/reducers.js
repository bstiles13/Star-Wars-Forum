import { combineReducers } from 'redux';
import getArticlesReducer from './getArticlesReducer.js';
import getTopicsReducer from './getTopicsReducer.js';
import getThreadsReducer from './getThreadsReducer.js';
import getOneThreadReducer from './getOneThreadReducer.js';
import handleNewThreadReducer from './handleNewThreadReducer.js';
import handleNewReplyReducer from './handleNewReplyReducer.js';
import getRepliesReducer from './getRepliesReducer.js';

let reducers = combineReducers({
    articles: getArticlesReducer,
    topics: getTopicsReducer,
    threads: getThreadsReducer,
    oneThread: getOneThreadReducer,
    newThread: handleNewThreadReducer,
    newReply: handleNewReplyReducer,
    replies: getRepliesReducer
})

export default reducers;