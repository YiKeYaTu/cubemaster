import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import indexReducers from '../reducers/index_reducers'
import Index from '../apps/index.jsx'
import { getLoginInf } from '../actions/header_action'


let store = createStore(
    indexReducers,
    applyMiddleware(
        thunkMiddleware
    )
)

store.dispatch(getLoginInf())

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('container')
);