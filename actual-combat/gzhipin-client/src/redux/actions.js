/*
* 包含n个action
* */
import io from 'socket.io-client'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-type'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'

//授权成功的action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
//接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
//接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
//接收消息列表的同步action
const receiveMsgList = ({users,chatMsgs,userid}) => ({type: RECEIVE_MSG_LIST, data: {users,chatMsgs,userid}})
//接收一个消息的同步action
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg,userid}})
//读取消息的同步action
const msgRead = ({count,from,to}) => ({type: MSG_READ, data: {count,from,to}})

//注册异步action
export const register = (user) => {
    const {username, password, password2, type} = user
    //表单验证
    if (!username) {
        return errorMsg('用户名不能为空')
    }
    if (!password) {
        return errorMsg('密码不能为空')
    }
    if (!password2) {
        return errorMsg('确认密码不能为空')
    }
    if (password !== password2) {
        return errorMsg('两次密码要一致')
    }
    return async dispatch => {
        //发送注册的异步ajax请求
        const response = await reqRegister({username, password, type})
        const result = response.data
        if (result.code === 0) {
            // 分发成功的同步action
            await getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}
//登录异步action
export const login = (user) => {
    const {username, password} = user
    //表单验证
    if (!username) {
        return errorMsg('用户名不能为空')
    }
    if (!password) {
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
        //发送注册的异步ajax请求
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            // 分发成功的同步action
            await getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}
//更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            //更新成功
            dispatch(receiveUser(result.data))
        } else {
            // 更新失败
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            // 成功
            await getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        console.log(response)
        const result = response.data
        if (result.code === 0) {
            // 成功
            dispatch(receiveUserList(result.data))
        }
    }
}

//发送信息的异步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        //发消息
        io.socket.emit('sendMsg',{from, to, content})
        // const response =  reqUserList(type)
        // const result = response.data
        // if(result.code === 0){
        //     // 成功
        //     dispatch(receiveUserList(result.data))
        // }
        // else{
        //     dispatch(receiveUserList(result.msg))
        // }
    }
}

//读取消息的异步action
export const readMsg = (from,to) =>{
    return async dispatch => {
        const response = await reqReadMsg(from)
        console.log(response)
        const result = response.data
        if (result.code === 0) {
            // 成功
            const count = result.data
            dispatch(msgRead({count,from,to}))
        }
    }
}


/*
* 单例对象
* 1：创建对象之前：判断对象是否已经创建，只有没有创建才去创建
* 2：创建对象之后：保存对象
* */
function initIo(dispatch,userid) {
    //判断
    if(!io.socket){
        //连接服务器,得到连接对象
        io.socket = io('ws://localhost:4000')
        //接收消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('接收到服务器发送的消息咯', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息，才去分发同步action保存信息
            if(userid===chatMsg.from || userid===chatMsg.to){
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}
/*
* 获取消息列表
* */
async function getMsgList(dispatch,userid) {
    initIo(dispatch,userid)
    const response = await reqChatMsgList()
    const result  = response.data
    if(result.code === 0){
        // 成功
        const {users,chatMsgs} = result.data
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}