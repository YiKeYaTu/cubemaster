import { MOVE_ANIMATION, GET_LOGIN_INF } from '../actions/header_action'

export function move (initLeft) {
    return function (state = initLeft, action) {
        switch (action.type) {
            case MOVE_ANIMATION:
                return action.left
            default:
                return state
        }
    }
}

export function loginInf (state = null, action) {
    switch (action.type) {
        case GET_LOGIN_INF:
            return action.res
        default:
            return state
    }
}

