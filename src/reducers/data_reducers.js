import { combineReducers } from 'redux'
import { move, loginInf } from './header_reducers'
import { CHANGE_DATASET, GETTING_DATASET, FINISH_GET_DATASET } from '../actions/data_action'

const INIT_LEFT = '455px'

function dataset (state = {data: [], finish: false}, action) {
    switch (action.type) {
        case CHANGE_DATASET:
            return {
                data: action.json,
                finish: false
            }
        case GETTING_DATASET:
            return {
                data: [],
                finish: false
            }
        case FINISH_GET_DATASET:
            return Object.assign({}, state, {
                finish: true
            })
        default: 
            return state
    }
}

let dataReducers = combineReducers({

    move: move(INIT_LEFT),
    loginInf: loginInf,
    dataset: dataset,
    INIT_LEFT: function () {
        return INIT_LEFT;
    }

})

export default dataReducers