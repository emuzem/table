import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk from "redux-thunk";
import './index.css'

import App from './App'
import reducer from "./store/reducer";
import {applyMiddleware, compose, createStore} from "redux";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
