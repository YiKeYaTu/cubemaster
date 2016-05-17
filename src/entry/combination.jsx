import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { fetchPosts } from '../actions/combination_action'
import thunkMiddleware from 'redux-thunk'
import combinationReducers from '../reducers/combination_reducers'
import Combination from '../apps/combination.jsx'

let store = createStore(
    combinationReducers,
    applyMiddleware(
        thunkMiddleware
    )
)

store.dispatch(fetchPosts()).then(() => {
    console.log(store.getState())
})

render(
    <Provider store={store}>
        <Combination />
    </Provider>,
    document.getElementById('container')
);