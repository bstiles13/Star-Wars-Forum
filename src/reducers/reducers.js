import { combineReducers } from 'redux';
import getTopicsReducer from './getTopicsReducer.js';


let reducers = combineReducers({
    topics: getTopicsReducer
})

export default reducers;