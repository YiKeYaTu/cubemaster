import { combineReducers } from 'redux'
import { CHANGE_BANNER } from '../actions/index_action'
import { move, loginInf } from './header_reducers'

const BANNER_COUNT = 3
const INIT_LEFT = '245'

function banner (state = {
    count: 0,
    len: BANNER_COUNT,
}, action) {
    switch (action.type) {
        case CHANGE_BANNER:
            return {
                count: action.count > BANNER_COUNT - 1 ? 0 : action.count,
                len: BANNER_COUNT
            }
        default:
            return state
    }
}

let indexReducers = combineReducers({
    move: move(INIT_LEFT),
    loginInf,
    banner,
    INIT_LEFT: function () {
        return INIT_LEFT;
    }
})

export default indexReducers