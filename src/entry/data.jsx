import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import dataReducers from '../reducers/data_reducers'
import Data from '../apps/data.jsx'

let store = createStore(dataReducers)

render(
    <Provider store={store}>
        <Data/>
    </Provider>,
    document.getElementById('container')
);