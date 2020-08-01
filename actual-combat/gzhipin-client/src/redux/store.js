/*
* redux 核心管理模块
* */
import {applyMiddleware, createStore} from "redux";
//异步
import thunk from "redux-thunk";
//开发插件
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from "./reducers";
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))