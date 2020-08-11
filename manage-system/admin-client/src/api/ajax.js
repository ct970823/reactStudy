/*
* 发送异步ajax请求的函数模块
* */
import axios from 'axios'
export default function ajax(url,data={},method='GET') {
    if(method === 'GET'){
        return axios.get(url, {
            params:data
        }).then()
    }else{
        return axios.post(url,data)
    }
}