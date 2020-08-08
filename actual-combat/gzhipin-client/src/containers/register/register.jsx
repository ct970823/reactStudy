import React from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
import Logo from "../../components/logo/logo";
const ListItem = List.Item
class Register extends React.Component {
    state = {
        username:'',
        password:'',
        password2:'',
        type:'dashen'//
    }
    register = () => {
        this.props.register(this.state)
    }

    //获取输入框值
    handleChange = (name,val) => {
        this.setState({
            [name]:val //属性名是name的值，不是name
        })
    }

    render() {
        const {type} = this.state
        const {msg,redirectTo} = this.props.user
        //若果redirectTo有值，重定向到主页面
        if(redirectTo){
            return  <Redirect to={redirectTo} />
        }
        return (
            <div>
               <NavBar>硅谷直聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg?<div className="error-msg">{msg}</div>:null}
                        <InputItem placeholder='请输入用户名' onChange={value => {this.handleChange('username',value)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={value => {this.handleChange('password',value)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入确认密码' type='password' onChange={value => {this.handleChange('password2',value)}}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='dashen'} onChange={()=>this.handleChange('type','dashen')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='laoban'} onChange={()=>this.handleChange('type','laoban')}>老板</Radio>
                        </ListItem>
                        <Button type='primary' onClick={this.register} >注&nbsp;&nbsp;&nbsp;册</Button>
                        <Button onClick={()=>this.props.history.replace('/login')}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)