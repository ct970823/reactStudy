/*
* 请求api
* */
import ajax from "./ajax";
const BASE = ''
//登录
export const login = (username,password) => ajax(BASE + '/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')