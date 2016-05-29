import { combineReducers } from 'redux'
import { move, loginInf } from './header_reducers'
import { 
    CHANGE_DATASET, GETTING_DATASET, FINISH_GET_DATASET, 
    CHANGE_DATASET_DOWNLIST, CHANGE_DATASET_FOCUS
} from '../actions/data_action'

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

function datasetFocuse (state = '所有数据', action) {
    switch (action.type) {
        case CHANGE_DATASET_FOCUS:
            if (action.data == 'total_data') {
                return '所有数据'
            } else if (action.data == 'mine_data') {
                return '我的数据'
            }
        default:
            return state
    }
}

function datasetChooseDownList (state = {
    top: '0px',
    opacity: '0',
}, action) {
    switch (action.type) {
        case CHANGE_DATASET_DOWNLIST:
            return action.flag ? {
                top: '46px',
                opacity: '1'
            } : {
                top: '0px',
                opacity: '0'
            }
        default:
            return state
    }
}

let dataReducers = combineReducers({

    move: move(INIT_LEFT),
    loginInf: loginInf,
    dataset: dataset,
    datasetFocuse: datasetFocuse,
    datasetChooseDownList: datasetChooseDownList,
    INIT_LEFT: function () {
        return INIT_LEFT;
    }

})

export default dataReducers