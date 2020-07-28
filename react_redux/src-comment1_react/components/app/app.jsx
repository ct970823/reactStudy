import React from 'react'
//引入组件
import ComponentAdd from "../component-add/component-add";
import ComponentList from "../component-list/component-list";
class app extends React.Component {
    // }
    //给组件对象指定state属性
    state = {
        // comments:[
        //     {username:'jack',content:'React真好玩'},
        //     {username:'rose',content:'React真有意思'},
        // ]
        comments:[]
    }
    componentDidMount() {
        //模拟发送异步ajax请求，获取数据
        setTimeout(()=>{
            const comments = [
                {username:'jack',content:'React真好玩'},
                {username:'rose',content:'React真有意思'},
            ]
            this.setState({comments})
        },1000)
    }

    //新增评论
    addComment = (comment) => {
        const {comments} = this.state
        comments.unshift(comment)
        this.setState({comments})
    }
    //删除指定评论
    delComment = (index) => {
        const {comments} = this.state
        comments.splice(index,1)
        this.setState({comments})
    }
    render() {
        const {comments} = this.state
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
                    <ComponentAdd addComment={this.addComment}/>
                    <ComponentList comments={comments} delComment={this.delComment}/>
                </div>
            </div>
        )
    }
}

export default app