/*
* 进行本地数据存储管理的工具模块
* */
//引入store(兼容大部分浏览器)
import store from 'store'

//定义常亮
const USER_KEY = 'user_key'

//暴露
export default {
    // 保存user
    saveUser (user) {
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    // 读取user
    getUser () {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    // 删除user
    removeUser () {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}