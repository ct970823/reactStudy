/*
* 包含n个reducer函数，根据老的返回新的
* */
import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    MSG_READ
} from './action-type'
import {getRedirectTo} from "../utils";

const initUser = {
    username:'',//用户名
    type:'',//用户类型dashen/laoban
    msg:'',//错误提示信息
    redirectTo:''//需要自动重定向的路由路径
}
//产生user状态的reducer
function user(state=initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS://data是user  action.data
            const {type,header} = action.data
            return {...action.data,redirectTo: getRedirectTo(type,header)}
        case ERROR_MSG://data是msg
            return {...state,msg:action.data}
        case RECEIVE_USER://data是msg
            return action.data
        case RESET_USER://data是msg
            return {...initUser,msg:action.data}
        default:
            return state
    }
}

//产生userList的reducer
const initUserList = []
function userList(state=initUserList,action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users:{},//所有用户信息的对象  属性名：userid 属性值是{username,header}
    chatMsgs:[],//当前用户所有相关msg的数组
    unReadCount:0//总的未读数量
}
//产生聊天状态的reducer
function chat(state=initChat,action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.rend && msg.to===action.data.userid?1:0),0)
            }
        case RECEIVE_MSG://data:chatMsg
            const {chatMsg} = action.data
            console.log(chatMsg)
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount + (!chatMsg.read && chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
            const {from,to,count} = action.data
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg=>{
                    if(msg.from===from && msg.to===to && !msg.read){
                        // 需要更新
                        return {...msg,read:true}
                    }else{
                        // 不需要更新
                        return msg
                    }
                }),
                unReadCount:state.unReadCount -count
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})