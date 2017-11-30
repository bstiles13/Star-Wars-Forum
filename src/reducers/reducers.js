import { combineReducers } from 'redux';
import getArticlesReducer from './getArticlesReducer.js';
import getTopicsReducer from './getTopicsReducer.js';
import getThreadsReducer from './getThreadsReducer.js';
import getOneThreadReducer from './getOneThreadReducer.js';
import handleNewThreadReducer from './handleNewThreadReducer.js';
import handleNewReplyReducer from './handleNewReplyReducer.js';
import getRepliesReducer from './getRepliesReducer.js';
import toggleTopicReducer from './toggleTopicReducer.js';
import handleLoginReducer from './handleLoginReducer.js';
import handleWarningsReducer from './handleWarningsReducer.js';
import getUserReducer from './getUserReducer.js';
import editReducer from './editReducer.js';
import handleEditReducer from './handleEditReducer.js';
import getStatsReducer from './getStatsReducer.js';

let reducers = combineReducers({
    articles: getArticlesReducer,
    topics: getTopicsReducer,
    threads: getThreadsReducer,
    oneThread: getOneThreadReducer,
    newThread: handleNewThreadReducer,
    newReply: handleNewReplyReducer,
    replies: getRepliesReducer,
    toggledTopic: toggleTopicReducer,
    userForm: handleLoginReducer,
    warnings: handleWarningsReducer,
    pendingEdits: editReducer,
    user: getUserReducer,
    edit: handleEditReducer,
    stats: getStatsReducer
})

export default reducers;