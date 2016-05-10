import { MOVE_ANIMATION } from '../actions/header_action'
export function move (initLeft) {
    return function (state = initLeft, action) {
        switch (action.type) {
            case MOVE_ANIMATION:
                return action.left;
            default:
                return state;
        }
    }
}

