import fetch from 'isomorphic-fetch'
import urlConfig from '../refs/urlConfig'
export const ADD_ACTIVE_INDEX = 'ADD_ACTIVE_INDEX'
export const ADD_AJAX_DATA = 'ADD_AJAX_DATA'


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