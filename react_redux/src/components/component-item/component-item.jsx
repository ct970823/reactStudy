import React from 'react'
import './component-item.css'
import {useDispatch} from "react-redux";

function ComponentItem (props) {
    const {comment,index,delComment} = props
    const dispatch = useDispatch()
    //删除当前评论
    function handleClick () {
        //提示
        if(window.confirm(`确认删除${comment.username}的评论吗？`)){
            //删除
            dispatch(delComment(index))
        }
    }

    return (
        <li className="list-group-item">
            <div className="handle">
                <a onClick={handleClick}>删除</a>
            </div>
            <p className="user"><span>{comment.username}</span><span>说:</span></p>
            <p className="centence">{comment.content}</p>
        </li>
    )
}


export default ComponentItem
