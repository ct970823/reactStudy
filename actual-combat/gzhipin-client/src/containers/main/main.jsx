import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from "antd-mobile";
import Cookies  from 'js-cookie'
import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info";
import Dashen from "../dashen/dashen";
import Laoban from "../laoban/laoban";
import Message from "../message/message";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/not-found";
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";
import {getRedirectTo} from '../../utils/index'
import {getUser} from "../../redux/actions";

class Main extends React.Component {

    //给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //读取cookie中的userid
        const userid = Cookies.get('userid')
        const {_id} = this.props
        if(userid && !_id){
            // 发送异步请求，获取user信息
            this.props.getUser()
        }
    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid')
        //如果沒有，重定向到登录界面
        if(!userid){
            return <Redirect to='/login'/>
        }
        //如果有，读取redux中的user状态
        const {user,unReadCount} = this.props
        if(!user._id){
            // 如果user没有_id,返回null（不做任何显示）
            return null
        }else{
            // 如果有_id,显示对应的界面
            // 根据user的type和header来计算出一个重定向的路由路径
            let path = this.props.pathname
            if(path === '/'){
                path = getRedirectTo(user.type,user.header)
                return <Redirect to={path}/>
            }
        }
        const {navList} = this
        const path = this.props.location.pathname
        //得到当前的nav，可能没有
        const currentNav = navList.find(nav => nav.path === path)
        if(currentNav){
            if(user.type==='laoban'){
                // 隐藏数组第二个
                navList[1].hide = true
            }else{
                // 隐藏数组第一个
                navList[0].hide = true
            }
        }
        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} key={nav.path} component={nav.component}/>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/>:null}
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)