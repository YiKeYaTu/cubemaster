import fetch from 'isomorphic-fetch'
import urlConfig from '../refs/urlConfig'

export const GET_DATASET = 'GET_DATASET'
export const CHANGE_DATASET = 'CHANGE_DATASET'
export const GETTING_DATASET = 'GETTING_DATASET'
export const FINISH_GET_DATASET = 'FINISH_GET_DATASET'
export const CHANGE_DATASET_DOWNLIST = 'CHANGE_DATASET_DOWNLIST'
export const CHANGE_DATASET_FOCUS = 'CHANGE_DATASET_FOCUS'

export function fetchDataset (obj) {
    let str = ''

    obj = obj || {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            str += key + '=' + obj[key] + '&'
        }
    }

    return function (dispatch) {

        obj.showLoading && dispatch(_gettingDataset())
        dispatch(changeDatasetFocuse(obj.operate))
        return fetch(urlConfig.datasetServer + '?' + str.slice(0, -1), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
        })
            .then((res) => res.json())
            .then((json) => {
                dispatch(_changeDataset(json))
                dispatch(_finishGetDataset())
                document.body.scrollTop = 0
            })
    }
}

export function changeDatasetFocuse (data) {
    return {
        type: CHANGE_DATASET_FOCUS,
        data
    }
}

export function changeDatasetDownlist (flag) {
    return {
        type: CHANGE_DATASET_DOWNLIST,
        flag
    }
}

function _changeDataset (json) {

    return {
        type: CHANGE_DATASET,
        json
    }
}

function _gettingDataset () {

    return {
        type: GETTING_DATASET,
    }
}

function _finishGetDataset () {

    return {
        type: FINISH_GET_DATASET
    }
}