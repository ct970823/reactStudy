/*
* 发送异步ajax请求的函数模块
* 1. 优化：统一处理请求异常
* */
import axios from 'axios'
import {message} from "antd";
export default function ajax(url,data={},method='GET') {
    return new Promise((resolve,reject) => {
        let promise
        // 1. 执行异步ajax请求
        if(method === 'GET'){
            promise = axios.get(url, {
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response => {
            // 2. 成功调用resolve
            resolve(response.data)
        }).catch(error => {
            // 3. 失败，不调用reject ，直接提示异常信息
            message.error('请求出错：'+error.message)
        })

    })

}