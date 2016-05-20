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

// {"algorithm":[{"algorithm_id":"3","algorithm_name":"wordSplit","associated_tasks":"分类算法","data_requirements":"无","data_test":"无","description":"分词","file_path":"5\\algorithm\\TestLyWordSplit.jar","in_pattern":"无","ispublic":"0","key_word":[{"keyword":"分词","keyword_id":3}],"out_pattern":"无","package_name":"wordSplitLy2.LyWordSplit2","parameter_count":"0","parameters":[],"platform":"java","scope":"1000","submit_datetime":"2016-03-20 11:09:18","user_name":"lyaa"},{"algorithm_id":"4","algorithm_name":"WordSplit1","associated_tasks":"分类算法","data_requirements":"wu ","data_test":"wu","description":"wu","file_path":"5\\algorithm\\TestLyWordSplit.jar","in_pattern":"wu","ispublic":"0","key_word":[{"keyword":"wu","keyword_id":4}],"out_pattern":"wu","package_name":"wordSplitLy2.LyWordSplit2","parameter_count":"0","parameters":[],"platform":"java","scope":"1000","submit_datetime":"2016-03-20 11:58:52","user_name":"lyaa"},{"algorithm_id":"7","algorithm_name":"kmeans","associated_tasks":"分类算法","data_requirements":"1","data_test":"1","description":"kmeans","file_path":"1\\algorithm\\testknn6.jar","in_pattern":"1","ispublic":"0","key_word":[{"keyword":"kmeans","keyword_id":7}],"out_pattern":"1","package_name":"kn.KNN","parameter_count":"1","parameters":[{"parameter_id":4,"parameter_name":"k","parameter_type":"int","parameter_value":"3"}],"platform":"java","scope":"1","submit_datetime":"2016-03-21 19:44:36"},{"algorithm_id":"8","algorithm_name":"knn3","associated_tasks":"分类算法","data_requirements":"f","data_test":"f","description":"f","file_path":"1\\algorithm\\Knn6.0.jar","in_pattern":"f","ispublic":"0","key_word":[{"keyword":"分类","keyword_id":8}],"out_pattern":"f","package_name":"knn.KNN","parameter_count":"1","parameters":[{"parameter_id":5,"parameter_name":"k","parameter_type":"int","parameter_value":"3"}],"platform":"java","scope":"1222","submit_datetime":"2016-03-22 00:03:21"},{"algorithm_id":"1","algorithm_name":"testKnn5","associated_tasks":"分类算法","data_requirements":"e","data_test":"e","description":"e","file_path":"5\\algorithm\\Knn6.0.jar","in_pattern":"e","ispublic":"0","key_word":[{"keyword":"e","keyword_id":1}],"out_pattern":"e","package_name":"knn.KNN","parameter_count":"1","parameters":[{"parameter_id":1,"parameter_name":"e","parameter_type":"int","parameter_value":"3"}],"platform":"java","scope":"e","submit_datetime":"2016-03-20 10:36:06","user_name":"lyaa"},{"algorithm_id":"2","algorithm_name":"wordSplit","associated_tasks":"分类算法","data_requirements":"无","data_test":"无","description":"分词","file_path":"5\\algorithm\\TestLyWordSplit.jar","in_pattern":"无","ispublic":"0","key_word":[{"keyword":"分词","keyword_id":2}],"out_pattern":"无","package_name":"wordSplitLy2.LyWordSplit2","parameter_count":"0","parameters":[],"platform":"java","scope":"1000","submit_datetime":"2016-03-20 11:09:09","user_name":"lyaa"}],"dataset":[{"area":"无","associated_tasks":"分类算法","attribute_count":"2","attributes":[{"attribute_character":0,"attribute_id":1,"attribute_label":0,"attribute_missing":"无","attribute_name":"ll","attribute_range":"无","attribute_sequence":1,"attribute_type":"数值"},{"attribute_character":0,"attribute_id":2,"attribute_label":1,"attribute_missing":"无","attribute_name":"label","attribute_range":"无","attribute_sequence":2,"attribute_type":"数值"}],"dataset_id":"1","dataset_name":"文本数据","dataset_type":"0","description":"文本","download_count":"0","file_path":"3\\dataset\\word.txt","ispublic":"0","number_examples":"","platform":"java","submit_datetime":"2016-03-18 19:27:58","user_name":"lya"},{"area":"e","associated_tasks":"分类算法","attribute_count":"5","attributes":[{"attribute_character":0,"attribute_id":3,"attribute_label":0,"attribute_missing":"21","attribute_name":"a1","attribute_range":"12","attribute_sequence":1,"attribute_type":"数值"},{"attribute_character":0,"attribute_id":4,"attribute_label":0,"attribute_missing":"12","attribute_name":"a2","attribute_range":"12","attribute_sequence":2,"attribute_type":"数值"},{"attribute_character":0,"attribute_id":5,"attribute_label":0,"attribute_missing":"12","attribute_name":"a3","attribute_range":"12","attribute_sequence":3,"attribute_type":"数值"},{"attribute_character":0,"attribute_id":6,"attribute_label":0,"attribute_missing":"12","attribute_name":"a4","attribute_range":"12","attribute_sequence":4,"attribute_type":"数值"},{"attribute_character":0,"attribute_id":7,"attribute_label":1,"attribute_missing":"12","attribute_name":"a5","attribute_range":"12","attribute_sequence":5,"attribute_type":"文本"}],"dataset_id":"2","dataset_name":"iris","dataset_type":"0","description":"e","download_count":"0","file_path":"5\\dataset\\iris.data","ispublic":"0","number_examples":"","platform":"java","submit_datetime":"2016-03-20 10:38:14","user_name":"lyaa"}],"protocol":"A-3-1-response"}

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
            showParameter: false,
            itemLeft: type == 1 ? 460 + index % 2 * 120 + 'px' : 100 + index % 2 * 120 + 'px',
            itemTop: Math.floor(index / 2) * 120 + 'px',
            value: item.algorithm_name || item.dataset_name, //数据或者算法的名称
            serverData: item, //该元素相关数据
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
    loginInf: loginInf,
    getInitData: getInitData,
    getInitAlgorithmItem: getInitAlgorithmItem,

    INIT_LEFT: function () {

        return INIT_LEFT

    }

})

export default combinationReducers