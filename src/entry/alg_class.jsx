import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import algReducers from '../reducers/alg_reducers'
import AlgClass from '../apps/alg_class.jsx'
import { getLoginInf } from '../actions/header_action'


let store = createStore(
    algReducers,
    applyMiddleware(
        thunkMiddleware
    )
)

store.dispatch(getLoginInf())


render(
    <Provider store={store}>
        <AlgClass />
    </Provider>,
    document.getElementById('container')
);