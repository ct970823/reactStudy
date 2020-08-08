var express = require('express');
const md5 = require('blueimp-md5')
var router = express.Router();
const {UserModel,ChatModel} = require('../db/models')
//注册路由
router.post(`/register`,function (req,res) {
  //读取请求参数(post,从body中取)
  const {username,password,type} = req.body
  console.log(req.body,username,password,type)
  //处理
  // 判断用户是否已经存在，如果存在返回提示错误的信息，如果不存在，保存
  // 查询（根据username）
  UserModel.findOne({username},function (error,user) {
    console.log(error,user)
    if(user){
      // 如果user有值（存在）
      res.send({code:1,msg:'此用户已存在'})
    }else{
      // 如果user为null（不存在）
      new UserModel({username,password:md5(password),type}).save(function (error,user) {
        console.log(user)
        //生成cookie(userid:user._id)
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        //返回包含user的json数据
        //响应数据中不要携带密码
        const data = {username,type,_id:user._id}
        res.send({code:0,data})
      })
    }

  })
})

const filter = {password:0,__v:0}//指定过滤的属性(查询到数据的返回中过滤掉此属性)

//登录路由
router.post('/login',function (req,res) {
  const {username,password} = req.body
  //查询数据库
  UserModel.findOne({
    username,
    password:md5(password)
  },filter,function (error,user) {
    if(user){
      //登录成功
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      //返回数据、
      res.send({code:0,data:user})
    }else{
      //登录失败
      res.send({code:1,msg:'用户名或密码不正确'})
    }
  })
})

//更新用户信息
router.post('/update',function (req,res) {
  //从请求的cookie中得到id
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  //得到提交的用户数据
  const user = req.body
  UserModel.findByIdAndUpdate({_id: userid},user,function (error,oldUser) {
    if(!oldUser){
      // 通知浏览器删除userid cookie
      res.clearCookie('userid')
      // 返回提示信息
      res.send({code:1,msg:'请先登录'})
    }else{
      //准备返回的user数据
      //因为user中没有id，username和type，所以通过返回的oldUser中的数据拼接到一起
      const {_id,username,type} = oldUser
      const data = Object.assign(user,{_id,username,type})
      res.send({code:0,data})
    }
  })

})

//获取用户信息的路由
router.get('/user',function (req,res) {
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  UserModel.findOne({_id:userid},filter,function (error,user) {
    res.send({code:0,data:user})
  })
})

//获取用户列表(用户类型)
router.get('/userlist',function (req,res) {
  const {type} = req.query
  UserModel.find({type},filter,function (err,users) {
    res.send({code:0,data:users})
  })
})

//获取当前用户所有的消息列表
router.get('/messageList',function (req,res) {
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  UserModel.find(function (err,userDocs) {
    console.log(userDocs)
    //累加
    const users = userDocs.reduce((users,user)=>{
      users[user.id] = {username:user.username,header:user.header}
      return users
    },{})
    // 查询userid相关的所有聊天信息
    //   参数1：查询条件
    //   参数2：过滤条件
    //   参数3：回调函数
    //$or:标识或  from=userid或to=userid
    ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function (err,chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有消息数据
      res.send({code:0,data:{users,chatMsgs}})
    })
  })

})

//修改指定消息为已读
router.post('/readMsg',function (req,res) {
  //得到请求中的from和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  * 更新数据库中的chat数据
  * 参数1：查询条件
  * 参数2：更新为指定的数据对象
  * 参数3：是否1次更新多条，默认只更新一条
  * 参数4：更新完成的回调函数
  * */
  ChatModel.updateMany({from, to, read:false},{read:true},{multi:true},function (err,doc) {

    res.send({code:0,data:doc.nModified})
  })
})

module.exports = router;
