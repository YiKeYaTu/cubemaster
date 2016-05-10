import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import indexReducers from '../reducers/index_reducers'
import Index from '../apps/index.jsx'

let store = createStore(indexReducers)
render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('container')
);