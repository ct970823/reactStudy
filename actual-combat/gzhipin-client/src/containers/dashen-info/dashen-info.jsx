/*
* 老板信息完善的路由组件
* */
import React from 'react'
import {connect} from 'react-redux'
import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";
import {Redirect} from "react-router-dom";
import {updateUser} from "../../redux/actions";
class DashenInfo extends React.Component {
    state = {
        header:'',//头像
        post:'',//职位
        info:''//要求

    }

    setHeader = (header) => {
        this.setState({header})
    }

    handleChange = (name,value) => {
        this.setState({
            [name]:value
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }
    render() {
        const {header,type} = this.props.user
        if(header){
            //信息已完善
            const path = type==='dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={value => this.handleChange('post',value)}>求职岗位：</InputItem>
                <TextareaItem rows={3} title='个人介绍：' onChange={value => this.handleChange('info',value)}/>
                <Button type='primary' onClick={this.save}>保 存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(DashenInfo)