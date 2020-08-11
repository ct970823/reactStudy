/*
* 请求api
* */
import ajax from "./ajax";
//登录
export const login = (username,password) => ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')