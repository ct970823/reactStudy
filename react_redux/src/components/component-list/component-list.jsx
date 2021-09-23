import React,{useEffect} from 'react'
import ComponentItem from "../component-item/component-item";
import {getComments} from "../../redux/actions";
import './component-list.css'
import {useDispatch, useSelector} from "react-redux";

function ComponentList () {
    const comments = useSelector(state=>state.comments)
    const display = comments.length === 0 ? 'block' : 'none'
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getComments())
    },[])//加[]，表示只在初始化时执行一次
    return (
        <div className="col-md-8">
            <h3 className="reply">评论回复：</h3>
            <h2 style={{display}}>暂无评论，点击左侧添加评论！ ！！</h2>
            <ul className="list-group">
                {
                    comments.map((comment,index) => <ComponentItem comment={comment} key={index} index={index}/>)
                }
            </ul>
        </div>
    )
}

export default ComponentList
