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

export function loginOut (id) {
    return {
        type: LOGIN_OUT,
        id
    }
}

export function getLoginInf (loginOut) {
    return function (dispatch) {
        return fetch(urlConfig.handleCheckLoginServer, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) => {
                if (loginOut) {

                } else {
                    dispatch(checkLoginInf(res))
                }
            })
    }
}
