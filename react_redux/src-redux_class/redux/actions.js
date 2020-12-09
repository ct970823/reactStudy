/*
* 包含所有action creator
* 同步的action都返回一个对象
* 异步的action返回一个函数
* */

import {ADD_COMMENT,DEL_COMMENT,RECEIVE_COMMENTS} from "./action-type";
//添加
export const addComment = (comment) => ({type:ADD_COMMENT,data:comment})
//删除
export const delComment = (index) => ({type:DEL_COMMENT,data:index})
//同步接收comments
const receiveComments = (comments) => ({type:RECEIVE_COMMENTS,data:comments})
//异步action(函数嵌套)
export const getComments = (number) => {
    return dispatch => {
        //模拟ajax请求获取异步数据
        setTimeout(() => {
            const comments = [
                {username:'jack',content:'React真好玩'},
                {username:'rose',content:'React真有意思'}
            ]
            dispatch(receiveComments(comments))
        },1000)
    }
}