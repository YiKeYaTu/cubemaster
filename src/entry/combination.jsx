import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import combinationReducers from '../reducers/combination_reducers'
import Combination from '../apps/combination.jsx'
import { getLoginInf } from '../actions/header_action'

let store = createStore(
    combinationReducers,
    applyMiddleware(
        thunkMiddleware
    )
)

store.dispatch(getLoginInf()).then(() => {

    let res = store.getState()

    let redirect = res && res.loginInf && res.loginInf.redirect

    if (redirect) {
        window.location = redirect
    }

})

render(
    <Provider store={store}>
        <Combination />
    </Provider>,
    document.getElementById('container')
);