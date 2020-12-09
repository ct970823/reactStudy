import React from 'react'
//引入组件
import Search from "./search";
import Main from "./main";
class app extends React.Component {

    render() {
        return (
            <div className="container">
                <Search/>
                <Main/>
            </div>
        )
    }
}

export default app