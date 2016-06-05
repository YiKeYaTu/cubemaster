import urlConfig from '../refs/urlConfig'

export const GET_ALG = 'GET_ALG'
export const CHANGE_ALG = 'CHANGE_ALG'
export const GETTING_ALG = 'GETTING_ALG'
export const FINISH_ALG = 'FINISH_ALG'

function __changeAlg (json) {
    return {
        type: CHANGE_ALG,
        json
    }
}

function __gettingAlg () {
    return {
        type: GETTING_ALG,
        finish: false
    }
}

function __finishGetAlg () {
    return {
        type: FINISH_ALG,
        finish: true
    }
}

export function fetchAlg (obj) {
    let str = ''

    obj = obj || {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            str += key + '=' + obj[key] + '&'
        }
    }

    return function (dispatch) {
        dispatch(__gettingAlg())
        return fetch(urlConfig.algClassServer + '?' + str.slice(0, -1), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
        })
            .then((res) => res.json())
            .then((json) => {
                dispatch(__changeAlg(json))
                dispatch(__finishGetAlg())
            })
    }
}
