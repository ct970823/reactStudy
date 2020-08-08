/*
* 老板信息完善的路由组件
* */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button,

} from 'antd-mobile'
import HeaderSelector from "../../components/header-selector/header-selector";
import {updateUser} from "../../redux/actions";

class LaobanInfo extends React.Component {

    state = {
        header:'',//头像
        post:'',//职位
        company:'',//公司名称
        salary:'',//薪水
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
        console.log(this.state)
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入职位' onChange={value => this.handleChange('post',value)}>招聘职位：</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={value => this.handleChange('company',value)}>公司名称：</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={value => this.handleChange('salary',value)}>职位薪资：</InputItem>
                <TextareaItem rows={3} title='职位要求：' onChange={value => this.handleChange('info',value)}/>
                <Button type='primary' onClick={this.save}>保 存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(LaobanInfo)