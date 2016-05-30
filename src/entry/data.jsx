import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import dataReducers from '../reducers/data_reducers'
import Data from '../apps/data.jsx'
import { getLoginInf } from '../actions/header_action'
import { fetchDataset } from '../actions/data_action'


let store = createStore(
    dataReducers,
    applyMiddleware(
        thunkMiddleware
    )
)


store.dispatch(getLoginInf()).then(() => {

    let res = store.getState()

    let redirect = res && res.loginInf && res.loginInf.redirect

    if (redirect) {
        window.location = `/CubeMaster1.3/user/redirectLogin?redirect=${redirect}`
    }

})

store.dispatch(fetchDataset({
    operate: 'total_data',
    current_page: '1',
    per_page_number: '21',
    showLoading: true
}))

render(
    <Provider store={store}>
        <Data/>
    </Provider>,
    document.getElementById('container')
);