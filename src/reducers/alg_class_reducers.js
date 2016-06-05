import { combineReducers } from 'redux'
import { CHANGE_BANNER } from '../actions/index_action'
import { move, loginInf } from './header_reducers'
import { CHANGE_ALG, GETTING_ALG, FINISH_ALG } from '../actions/alg_action'

const INIT_LEFT = '385'

function alg (state = {
    json: null,
    finish: false
}, action) {
    switch (action.type) {
        case GETTING_ALG:
            return Object.assign({}, state, {
                finish: false
            })
        case CHANGE_ALG:
            return Object.assign({}, state, {
                json: action.json
            })
        case FINISH_ALG:
            return Object.assign({}, state, {
                finish: true
            })
        default:
            return state
    }
}

let algReducers = combineReducers({
    move: move(INIT_LEFT),
    loginInf,
    alg,
    INIT_LEFT: function () {
        return INIT_LEFT;
    }
})

export default algReducers