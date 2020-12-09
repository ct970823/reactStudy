import React from 'react'
//引入组件
import Search from "./search";
import Main from "./main";
//函数形式
function app (){
    return (
        <div className="container">
            <Search/>
            <Main/>
        </div>
    )
}
export default app
