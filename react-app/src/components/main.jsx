import React from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import './main.css'
class Main extends React.Component {

    state = {
        initView:true,
        loading:false,
        users:null,
        errorMsg:null
    }

    componentDidMount() {
        //订阅消息
        PubSub.subscribe('search', (msg,searchName) => {
            console.log(searchName)
            //发ajax请求
            const url = `https://api.github.com/search/users?q=${searchName}`
            axios.get(url)
                .then(res=>{
                    console.log(res)
                    const result = res.data
                    const users = result.items.map((item) => (
                        {
                            url:item.html_url,
                            avatarUrl:item.avatar_url,
                            name:item.login
                        }
                    ))
                    this.setState({loading:false,users})
                })
                .catch(err=>{
                    console.log(err)
                    this.setState({loading:false,errorMsg:err.message})
                })
        })
    }


    render() {
        const {initView,loading,users,errorMsg} = this.state
        if(initView){
            return <h2>请输入搜索内容</h2>
        }else if(loading){
            return <h2>请求中...</h2>
        }else if(errorMsg){
            return <h2>{{errorMsg}}</h2>
        }else{
            return (
                <div className="row">
                    {
                        users.map((user,index) => (
                            <div className="card" key={index}>
                                <a href={user.url}>
                                    <img src={user.avatarUrl} alt="图片" style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{user.name}</p>
                            </div>
                        ) )
                    }
                </div>
            )
        }

    }
}

export default Main