/*
* 用户选择头像组件
* */
import React from 'react'
import PropTypes from 'prop-types'
import {
    List,
    Grid
} from 'antd-mobile'
class HeaderSelector extends React.Component {
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        // 准备需要显示的数据
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/images/headers/头像${i+1}.png`)//不能使用import
            })
        }
    }
    state = {
        icon:null //头像
    }

    handleClick = ({text,icon}) => {
        // 更新当前组件状态
        this.setState({icon})
        // 更新父组件状态
        this.props.setHeader(text)
    }

    render() {
        //头部界面
        const {icon} = this.state
        const listHeader = !icon?'请选择头像':(
            <div>
                已选择头像：<img src={icon} alt="头像"/>
            </div>
        )
        return (
           <List renderHeader={()=>listHeader}>
               <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}/>
           </List>
        )
    }
}

export default HeaderSelector