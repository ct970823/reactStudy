var express = require('express');
const md5 = require('blueimp-md5')
var router = express.Router();
const UserModel = require('../db/models').UserModel
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


//登录路由

module.exports = router;
