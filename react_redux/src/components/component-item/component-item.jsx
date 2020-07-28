import React from 'react'
import PropTypes from 'prop-types'
import './component-item.css'

class ComponentItem extends React.Component {
    static propTypes = {
        comment:PropTypes.object.isRequired,
        index:PropTypes.number.isRequired,
        delComment:PropTypes.func.isRequired
    }
    //删除当前评论
    handleClick = () => {
        const {comment,index,delComment} = this.props
        //提示
        if(window.confirm(`确认删除${comment.username}的评论吗？`)){
            //删除
            delComment(index)
        }
    }
    render() {
        const {comment} = this.props
        return (
            <li className="list-group-item">
                <div className="handle">
                    <a onClick={this.handleClick}>删除</a>
                </div>
                <p className="user"><span>{comment.username}</span><span>说:</span></p>
                <p className="centence">{comment.content}</p>
            </li>
        )
    }
}

export default ComponentItem