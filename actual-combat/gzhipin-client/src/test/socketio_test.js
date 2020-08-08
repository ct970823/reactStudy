import io from 'socket.io-client'

//连接服务器,得到连接对象
const socket = io('ws://localhost:4000')

//发送消息
socket.emit('sendMsg',{name:'我发送了一条消息'})

//接收消息
socket.on('receiveMsg',function(data){
  console.log('接收到服务器发送的消息咯',data.name)
})

