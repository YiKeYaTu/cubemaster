import { combineReducers } from 'redux'
import { move, loginInf } from './header_reducers.js'
import { ADD_ACTIVE_INDEX, ADD_AJAX_DATA } from '../actions/combination_action'

const INIT_POS = '-60px',
    NEXT_POS = '0px',
    INIT_HTML = '待插入',
    NEXT_HTML = '已插入'



const INIT_LEFT = '525px'

function getInitData (state = {}, action) {
    switch (action.type) {
        case ADD_AJAX_DATA:
            return _getInf(action.json.dataset, '0')
        default:
            return state
    }
}

function getInitAlgorithmItem (state = {}, action) {
    switch (action.type) {
        case ADD_AJAX_DATA:
            return _getInf(action.json.algorithm, '1')
        default:
            return state
    }
}

function _randomColor () {
    return Math.floor(Math.random() * 60 + 150)
}



//将接受到的item数据转化成对象的形式
function _getInf (item, type) {
    let obj = {}
    item.forEach((item, index) => {
         obj[type + index] = {
            index: index,
            type: type,
            itemLeft: type == 1 ? 460 + index % 2 * 120 + 'px' : 100 + index % 2 * 120 + 'px',
            itemTop: Math.floor(index / 2) * 120 + 'px',
            value: item.algorithm_name || item.dataset_name, //数据或者算法的名称
            serverDaTA: item,
            right: INIT_POS, //数据或者算法左边元素的遮盖层的right
            background: `rgb(${_randomColor()}, ${_randomColor()}, ${_randomColor()})`, //元素的颜色
            itemHasAdd: false, //这个元素是否被插入到canvas上
            buttonInnerHTML: INIT_HTML, //遮盖层显示什么
        }
    })
    return obj
}

let combinationReducers = combineReducers({
    move: move(INIT_LEFT),
    loginInf,
    getInitData: getInitData,
    getInitAlgorithmItem: getInitAlgorithmItem,
    INIT_LEFT: function () {
        return INIT_LEFT
    }
})

export default combinationReducers