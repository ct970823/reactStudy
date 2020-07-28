import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//引入组件
import ComponentAdd from "../../components/component-add/component-add";
import ComponentList from "../../components/component-list/component-list";
import {addComment,delComment,getComments} from "../../redux/actions";

class App extends React.Component {
    static propTypes = {
        comments:PropTypes.array.isRequired,
        addComment:PropTypes.func.isRequired,
        delComment:PropTypes.func.isRequired,
        getComments:PropTypes.func.isRequired,
    }
    componentDidMount() {
       // 异步获取数据
       this.props.getComments()
    }
    render() {
        const {comments,addComment,delComment} = this.props
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
                    <ComponentAdd addComment={addComment}/>
                    <ComponentList comments={comments} delComment={delComment}/>
                </div>
            </div>
        )
    }
}

export default connect(
    state=>({comments:state.comments}),//state就是一个comments数组
    {addComment,delComment,getComments}
)(App)