module.exports = function (server) {
    const io = require('socket.io')(server)

    // 监视客户端与服务器的连接
    io.on('connection',function (socket) {
        console.log('有一个客户端连接上了服务器')

        // 绑定监听，接收客户端发送的信息
        socket.on('sendMsg',function (data) {
            console.log('服务器接收到了一条消息',data.name)
            // 服务器向客户端发送信息
            socket.emit('receiveMsg',{name:'我回复了一条消息'})
        })
    })
}