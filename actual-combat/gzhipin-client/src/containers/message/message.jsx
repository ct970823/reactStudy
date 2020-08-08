import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from "antd-mobile";
const Item = List.Item
const Brief  =Item.Brief
class Message extends React.Component {
    state = {}

    /*
    * 对chatMsgs按chat_id进行分组
    * 1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id:lastMsg}
    * 2.得到所有lastMsg的数组
    * 3。对数组进行排序（按create_time降序）
    * */
    getLastMsgs = (chatMsgs,userId) => {
        // 1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id，lastMsg}
        const lastMsgObjs = {}
        chatMsgs.forEach(msg => {
            // 对msg进行个体的统计
            if(msg.to===userId && !msg.read){
                msg.unReadCount = 1
            }else{
                msg.unReadCount = 0
            }
            //得到msg的聊天标识id
            const chatId = msg.chat_id
            // 获取已保存的当前组件的lastMsg
            const lastMsg = lastMsgObjs[chatId]
            //没有
            if(!lastMsg){//当前msg就是所在组的lastMsg
                lastMsgObjs[chatId] = msg
            }else{
                //保存已统计的未读数量
                const unReadCount = lastMsg.unReadCount
                // 如果msg比lastMsg晚，就讲msg保存为lastMsg
                if(msg.create_time > lastMsg.create_time){
                    lastMsgObjs[chatId] = msg
                }
                lastMsgObjs[chatId].unReadCount = unReadCount + msg.unReadCount
            }
        })
        console.log(lastMsgObjs)
        // 2.得到所有lastMsg的数组(通过Object.values()转成数组)
        const lastMsgList = Object.values(lastMsgObjs)

        // 3。对数组进行排序（按create_time降序）
        lastMsgList.sort(function (m1,m2) {
            // 如果结果<0 将m1放前面，如果结果>0 m2放前面，如过结果为0 不变
            return m2.create_time - m1.create_time
        })
        return lastMsgList
    }

    render() {
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat

        const lastMsgList = this.getLastMsgs(chatMsgs,user._id)
        return (
            <List style={{marginTop:50, marginBottom: 50}}>

                {
                    lastMsgList.map(msg =>{
                        // 得到目标用户的id
                        const targetUserId = msg.to===user._id ? msg.from : msg.to
                        // 得到目标用户的信息
                        const targetUser = users[targetUserId]
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={targetUser.header ? require(`../../assets/images/headers/${targetUser.header}.png`) : require(`../../assets/images/headers/头像1.png`)}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {}
)(Message)