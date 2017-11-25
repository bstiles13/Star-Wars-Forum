import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers.js';

let middleware = applyMiddleware(thunk);
let store = createStore(reducers, middleware);

store.subscribe(() => {
    // console.log("store update:", store.getState())
    console.log("store change");
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
