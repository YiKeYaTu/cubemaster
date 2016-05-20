import fetch from 'isomorphic-fetch'
import urlConfig from '../refs/urlConfig'
export const ADD_ACTIVE_INDEX = 'ADD_ACTIVE_INDEX'
export const ADD_AJAX_DATA = 'ADD_AJAX_DATA'
export const SEND_CONNECT = 'SEND_CONNECT'


export function addActiveIndex (obj) {
    return {
        type: ADD_ACTIVE_INDEX,
        obj
    }
}

export function addAjaxData (json) {
    return {
        type: ADD_AJAX_DATA,
        json
    }
}

export function sendConnect (json) {
    return {
        type: SEND_CONNECT,
        json
    }
}

export function fetchPosts () {

    return function (dispatch) {

        return fetch(urlConfig.getDataServer, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(addAjaxData(json))
            })
    }
}

export function fetchConnect (argument) {

    let data = ''

    for (let key in argument) {
        if (argument.hasOwnProperty(key)) {
            if (typeof argument[key] === 'object') {
                argument[key] = JSON.stringify(argument[key])
            }
            data += `${key}=${argument[key]}&`
        }
    }

    return function (dispatch) {

        return fetch(urlConfig.runServer, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.slice(0, -1)
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(sendConnect(json))
            })

    }
}