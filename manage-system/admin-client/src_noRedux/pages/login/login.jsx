import React from 'react'
import {Redirect} from 'react-router-dom'
import {
    Form,
    Button,
    Input,
    message
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from '../../assets/images/logo.png'
import {login} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
/*
* 登录的路由组件
* */


class Login extends React.Component {
    state = {}

    //校验成功回调
    onFinish = ({username,password}) => {
        console.log(username,password)
        login(username,password).then(res => {
            console.log(res)
            if (res.status===0) {
                // 登录成功
                message.success('登录成功')
                // 保存user
                memoryUtils.user = res.data
                storageUtils.saveUser(res.data)
                // 跳转到管理界面
                this.props.history.replace('/')
            }else{
                // 登录失败
                message.error(res.msg)
            }
        })
    }

    render() {
        //如果用户已经登录，自动跳转到登录界面
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to='/'/>
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




export default Login