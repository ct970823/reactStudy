import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './main.css'
class Main extends React.Component {
    static propTypes = {
        searchName:PropTypes.string.isRequired
    }

    state = {
        initView:true,
        loading:false,
        users:null,
        errorMsg:null
    }
    //当组件接收到新的属性时回调
    componentWillReceiveProps(nextProps, nextContext) {
        const {searchName} = nextProps
        console.log(nextProps)
        //更新状态
        this.setState({
            initView:false,
            loading:true
        })
        //发ajax请求
        axios.get(`https://api.github.com/search/users?q=${searchName}`)
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