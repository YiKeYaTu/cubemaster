import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import combinationReducers from '../reducers/combination_reducers'
import Combination from '../apps/combination.jsx'

let store = createStore(combinationReducers)

render(
    <Provider store={store}>
        <Combination />
    </Provider>,
    document.getElementById('container')
);