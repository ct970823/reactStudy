/*
* 包含所有action creator
* 同步的action都返回一个对象
* 异步的action返回一个函数
* */

import {INCREMENT,DECREMENT} from "./action-type";
//增加
export const increment = (number) => ({type:INCREMENT,data:number})
//减少
export const decrement = (number) => ({type:DECREMENT,data:number})
//异步action(函数嵌套)
export  const incrementAsync = (number) => {
    return dispatch => {
        //异步代码
        setTimeout(() => {
            dispatch(increment(number))
        },1000)
    }
}