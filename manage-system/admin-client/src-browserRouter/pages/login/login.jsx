import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    Form,
    Button,
    Input
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from '../../assets/images/logo.png'
import {loginAction} from "../../redux/actions";

/*
* 登录的路由组件
* */


class Login extends React.Component {
    state = {}

    //校验成功回调
    onFinish = ({username,password}) => {
        console.log(username,password)
        this.props.loginAction(username,password)
    }

    render() {
        //如果用户已经登录，自动跳转到登录界面
        // const user = memoryUtils.user
        const user = this.props.user
        console.log(1111,user)
        if (user && user._id) {
            return <Redirect to='/home'/>
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={
                                // 声明式验证：直接使用别人定义好的验证规则进行验证
                                [
                                    { required: true, message: '请输入用户名!' },
                                    { min: 4, message: '用户名长度为4-10位!' },
                                    { max: 10, message: '用户名长度为4-10位!' },
                                    { pattern: /^\w+$/, message: '用户名由数字、字母、下划线组成!' }
                                ]
                            }
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                // 声明式验证：直接使用别人定义好的验证规则进行验证
                                [
                                    { required: true, message: '请输入密码!' },
                                    { min: 4, message: '密码长度为4-16位!' },
                                    { max: 16, message: '密码长度为4-16位!' },
                                    { pattern: /^\w+$/, message: '密码由数字、字母、下划线组成!' }
                                ]
                            }
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        {/*<Form.Item>*/}
                        {/*    <Form.Item name="remember" valuePropName="checked" noStyle>*/}
                        {/*        <Checkbox>记住我</Checkbox>*/}
                        {/*    </Form.Item>*/}
                        {/*</Form.Item>*/}

                        <Form.Item>
                            <Button type="primary" htmlType="submit"  className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}




export default connect(
    state=>({user:state.user}),
    {loginAction}
)(Login)