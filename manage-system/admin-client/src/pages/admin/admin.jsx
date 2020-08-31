import React from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import Header from "../../components/header/header";
import LeftNav from "../../components/left-nav/left-nav";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../chats/bar";
import Line from "../chats/line";
import Pie from "../chats/pie";
const {  Footer, Sider, Content } = Layout;
/*
* 后台管理的路由组件
* */
class Admin extends React.Component {
    state = {}

    render() {
        const {user} = memoryUtils
        //未登录
        if (!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/bar' component={Bar}/>
                            <Route path='/line' component={Line}/>
                            <Route path='/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>这是个底部内容</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin