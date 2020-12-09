import React from 'react'
//引入组件
import ComponentAdd from "../../components/component-add/component-add";
import ComponentList from "../../components/component-list/component-list";


function App () {
    return (
        <div>
            <header className="site-header jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>请发表对React的评论</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <ComponentAdd/>
                <ComponentList/>
            </div>
        </div>
    )
}

export default App
