import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import combinationReducers from '../reducers/combination_reducers'
import Combination from '../apps/combination.jsx'

let store = createStore(
    combinationReducers,
    applyMiddleware(
        thunkMiddleware
    )
)

render(
    <Provider store={store}>
        <Combination />
    </Provider>,
    document.getElementById('container')
);