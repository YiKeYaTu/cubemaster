import { combineReducers } from 'redux'
import { move } from './header_reducers.js'

const INIT_LEFT = '455px'

let dataReducers = combineReducers({
    move: move(INIT_LEFT),
    INIT_LEFT: function () {
        return INIT_LEFT;
    }
})

export default dataReducers