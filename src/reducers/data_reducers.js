import { combineReducers } from 'redux'
import { move, loginInf } from './header_reducers.js'

const INIT_LEFT = '455px'

let dataReducers = combineReducers({
    move: move(INIT_LEFT),
    loginInf,
    INIT_LEFT: function () {
        return INIT_LEFT;
    }
})

export default dataReducers