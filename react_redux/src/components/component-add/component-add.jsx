import React,{useState} from 'react'
import {useDispatch} from "react-redux";
import {addComment} from "../../redux/actions";


function ComponentAdd () {
    const [username,setUserName] = useState('')
    const [content,setContent] = useState('')
    const dispatch = useDispatch()
    function handleSubmit () {
        //收集数据
        const comment = {
            username,
            content
        }
        dispatch(addComment(comment))
        //清空数据
        setUserName('')
        setContent('')
    }

    return (
        <div className="col-md-4">
            <form className="form-horizontal">
                <div className="form-group">
                    <label>用户名</label>
                    <input type="text" className="form-control" placeholder="用户名" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>评论内容</label>
                    <textarea className="form-control" rows="6" placeholder="评论内容" value={content} onChange={(e)=>setContent(e.target.value)}/>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn btn-default pull-right" onClick={handleSubmit}>提交</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default ComponentAdd
