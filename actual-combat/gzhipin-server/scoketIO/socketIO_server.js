const {ChatModel} = require('../db/models')
module.exports = function (server) {
    const io = require('socket.io')(server)

    // 监视客户端与服务器的连接
    io.on('connection',function (socket) {
        console.log('有一个客户端连接上了服务器')

        // 绑定监听，接收客户端发送的信息
        socket.on('sendMsg',function ({from,to,content}) {
            console.log('服务器接收到了一条消息',{from,to,content})
            // 处理数据（保存消息）
            // 春被chatMsg对象的相关数据
            const chat_id = [from,to].sort().join('_')
            const create_time = Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save(function (error,chatMsg) {
                console.log(chatMsg)
                // 服务器向客户端发送信息
                // socket.emit('receiveMsg',chatMsg) //只是给自己发信息
                io.emit('receiveMsg',chatMsg) //给说他连接的客户daunt发送信息
            })

        })
    })
}