import io from 'socket.io-client'

//连接服务器，得到与服务器的连接对象
const socket = io('ws://localhost:4000')
//绑定监听，接收服务器发送的消息
socket.on('receiveMsg',function (data) {
    console.log('客户端接收服务器发送的消息', data)
})

//发消息
socket.emit('sendMsg',{name:'abcd'})
console.log('客户端向服务器发送的消息',{name:'abcd'})

