import fetch from 'isomorphic-fetch'
import urlConfig from '../refs/urlConfig'


export const MOVE_ANIMATION = 'MOVE_ANIMATION'
export const GET_LOGIN_INF = 'GET_LOGIN_INF'
export const LOGIN_OUT = 'LOGIN_OUT'


export function moveAnimation (left) {
    return {
        type: MOVE_ANIMATION, 
        left 
    }
}

export function checkLoginInf (res) {
    return {
        type: GET_LOGIN_INF,
        res
    }
}

export function loginOut () {
    return {
        type: LOGIN_OUT
    }
}

export function getLoginInf (out) {

    let url = urlConfig.loginServer

    if (out) {
        url = urlConfig.loginOutServer
    }

    return function (dispatch) {
        
        return fetch(url, {
            credentials: 'include'
        })
            .then((res) => {
                if (out) {
                    return null
                } else {
                    return res.json()
                }
            })
            .then((res) => {
                if (out) {
                    dispatch(loginOut())
                } else {
                    dispatch(checkLoginInf(res))
                }
            })
    }
}
