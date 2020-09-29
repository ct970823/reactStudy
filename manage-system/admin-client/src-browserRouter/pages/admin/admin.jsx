import React from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';
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
import NotFound from "../not-found/not-found";
const {  Footer, Sider, Content } = Layout;
/*
* 后台管理的路由组件
* */
class Admin extends React.Component {
    state = {}

    render() {
        const {user} = this.props
        //未登录
        if (!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{backgroundColor:'#fff',margin:'30px 20px'}}>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/bar' component={Bar}/>
                            <Route path='/line' component={Line}/>
                            <Route path='/pie' component={Pie}/>
                            {/*上面没有一个匹配的，直接显示*/}
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>这是个底部内容</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)