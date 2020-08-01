import React from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

import Logo from "../../components/logo/logo";
class Login extends React.Component {
    state = {
        username:'',
        password:''
    }

    login = () => {
        console.log(this.state)
    }

    handleChange = (name,value) => {
        this.setState({
            [name]:value
        })
    }
    render() {
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入用户名' onChange={value => this.handleChange('username',value)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={value => this.handleChange('password',value)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登录</Button>
                        <Button onClick={()=>this.props.history.replace('/register')}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login