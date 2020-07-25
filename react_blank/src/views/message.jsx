import React from 'react'
import {Route,Link} from 'react-router-dom'
import MessageDetail from "./message-detail";
class Message extends React.Component {
    state = {
        messages:[]
    }

    componentDidMount() {
        //模拟发送ajax请求
        setTimeout(()=>{
            const messages = [
                {id:1,title:'message001'},
                {id:2,title:'message002'},
                {id:3,title:'message003'}
            ]
            this.setState({messages})
        },1000)
    }
    //push
    showDetail = (id) => {
        this.props.history.push(`/home/message/messageDetail/${id}`)
    }
    // replace
    showDetail2 = (id) => {
        this.props.history.replace(`/home/message/messageDetail/${id}`)
    }
    back = () => {
        this.props.history.goBack()
    }
    forward = () => {
        this.props.history.goForward()
    }
    reqPage = () => {
        window.location = 'http://www.baidu.com'
    }
    render() {
        const {messages} = this.state
        return (
            <div>
                <ul>
                    {
                        messages.map((item,index)=>(
                            <li key={index}>
                               <Link to={`/home/message/messageDetail/${item.id}`}>{item.title}</Link>
                                &nbsp;&nbsp;<button onClick={()=>this.showDetail(item.id)}>push查看</button>
                                &nbsp;&nbsp;<button onClick={()=>this.showDetail2(item.id)}>replace查看</button>
                            </li>
                        ))
                    }
                </ul>
                <button onClick={this.back}>后退</button>
                <button onClick={this.forward}>前进</button>
                <button onClick={this.reqPage}>页面跳转</button>
                {/*:id 占位符*/}
                <Route path="/home/message/messageDetail/:id" component={MessageDetail}/>
            </div>
        )
    }
}

export default Message