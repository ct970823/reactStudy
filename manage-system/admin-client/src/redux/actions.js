/*
* 包含n个action creator函数的模块
* 同步action：对象{type:'xxx',data:数据值}
* 异步action：函数dispatch=>{}
* */
import {SET_HEAD_TITLE,RECEIVE_USER,RESET_USER} from "./action-types";
import {login} from '../api'
import {message} from "antd";
import storageUtils from "../utils/storageUtils";
//设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({type:SET_HEAD_TITLE,data:headTitle})
//设置登录用户信息的同步action
export const receiveUser = (user) => ({type:RECEIVE_USER,user})
//退出登录的同步action
export const logout = () => {
    storageUtils.removeUser()
    return {type:RESET_USER}
}

//登录的异步action
export const loginAction = (username,password) => {
    return async dispatch => {
        // 执行异步ajax请求
        const result = await login(username,password)
        if(result.status===0){
            const user = result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            message.error(result.msg)
        }

    }
}