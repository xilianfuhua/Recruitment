/**
 * 
 * 包含n个操作数据库集合数据的Model模块
 * 1. 连接数据库
 *   1.1. 引入 mongoose
 *   1.2. 连接指定数据库(URL 只有数据库是变化的) 
 *   1.3. 获取连接对象 1.4. 绑定连接完成的监听(用来提示连接成功)
 * 2. 定义出对应特定集合的 Model 并向外暴露
 *   2.1. 字义 Schema(描述文档结构)
 *   2.2. 定义 Model(与集合对应, 可以操作集合)
 *   2.3. 向外暴露 Model
 */

/*1. 连接数据库*/
    // 1.1. 引入 mongoose
    const mongoose = require('mongoose')
    // 1.2. 连接指定数据库(URL 只有数据库是变化的) 
    mongoose.connect('mongodb://localhost:27017/zhipin')
    // 1.3. 获取连接对象
    const conn = mongoose.connection
    // 1.4. 绑定连接完成的监听(用来提示连接成功)
    conn.on('connected',() => {
        console.log('ok,db connect success~~~')
    })

/*2. 定义出对应特定集合的 Model 并向外暴露*/
    // 2.1. 字义 Schema(描述文档结构)
    const userSchema = mongoose.Schema({ 
        username: {type: String, required: true}, // 用户名 
        password: {type: String, required: true}, // 密码 
        type: {type: String, required: true}, // 用户类型: dashen/laoban 
        header: {type: String}, // 头像名称 
        post: {type: String}, // 职位 
        info: {type: String}, // 个人或职位简介 
        company: {type: String}, // 公司名称 
        salary: {type: String} // 月薪 
    })
    // 2.2. 定义 Model(与集合对应, 可以操作集合)
    const UserModel = mongoose.model('user',userSchema) //集合为users

// function testDelete() {
//   UserModel.remove({username:'dashen05'},function (error,deleteUser) {
//     console.log('remove()',error,deleteUser)
//   })
// }
// testDelete()
    // 2.3. 向外暴露 Model
    exports.UserModel = UserModel

    // 定义 chats 集合的文档结构 
    const chatSchema = mongoose.Schema({ 
        from: {type: String, required: true}, // 发送用户的 id 
        to: {type: String, required: true}, // 接收用户的 id 
        chat_id: {type: String, required: true}, // from 和 to 组成的字符串 
        content: {type: String, required: true}, // 内容 
        read: {type:Boolean, default: false}, // 标识是否已读 
        create_time: {type: Number} // 创建时间 
    })
    // 定义能操作 chats 集合数据的 Model 
    const ChatModel = mongoose.model('chat', chatSchema) //集合为chats
    // 向外暴露 Model 
    exports.ChatModel = ChatModel



    //module.exports = xxx  一次性暴露
    //exports.xxx = value   多次暴露
