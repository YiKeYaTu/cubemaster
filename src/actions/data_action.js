import fetch from 'isomorphic-fetch'
import urlConfig from '../refs/urlConfig'

export const GET_DATASET = 'GET_DATASET'
export const CHANGE_DATASET = 'CHANGE_DATASET'
export const GETTING_DATASET = 'GETTING_DATASET'
export const FINISH_GET_DATASET = 'FINISH_GET_DATASET'

export function fetchDataset () {

    return function (dispatch) {

        dispatch(_gettingDataset())
        return fetch(urlConfig.datasetServer, {
            credentials: 'include',
            method: 'POST'
        })
            .then((res) => res.json())
            .then((json) => {
                dispatch(_changeDataset(json))
                dispatch(_finishGetDataset())
            })
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