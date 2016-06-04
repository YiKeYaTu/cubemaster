import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import algReducers from '../reducers/alg_reducers'
import Alg from '../apps/alg.jsx'
import { getLoginInf } from '../actions/header_action'
import { fetchAlg } from '../actions/alg_action'


let store = createStore(
    algReducers,
    applyMiddleware(
        thunkMiddleware
    )
)

store.dispatch(getLoginInf())
store.dispatch(fetchAlg({
    operate: 'total_algorithm',
    current_page: 1,
    per_page_number: 2,
}))

render(
    <Provider store={store}>
        <Alg />
    </Provider>,
    document.getElementById('container')
);