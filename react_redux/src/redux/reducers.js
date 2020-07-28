/*
* 包含n个reducer的模块
*/
//整合
import {combineReducers} from "redux";
import {ADD_COMMENT,DEL_COMMENT,RECEIVE_COMMENTS} from './action-type'
//初始化
const initComments = []
//生成新的state，不能改变旧state
function comments(state = initComments,action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [action.data,...state]
        case DEL_COMMENT:
            return state.filter((comment,index) => index!==action.data)
        case RECEIVE_COMMENTS:
            return action.data
        default:
            return state
    }
}
export  default combineReducers({
    comments //指定reducer对应的属性
})