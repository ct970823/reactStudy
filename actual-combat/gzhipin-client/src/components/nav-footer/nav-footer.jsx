import React from 'react'
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item

class NavFooter extends React.Component {
    static propTypes = {
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }

    state = {}

    render() {
        let {navList,unReadCount} = this.props
        //过滤hide为true 的nav
        navList = navList.filter(nav=>!nav.hide)
        const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map(nav=>(
                        <Item key={nav.path}
                              badge={nav.path==='/message'?unReadCount:0}
                              title={nav.text}
                              icon={{uri:require(`../../assets/images/nav/${nav.icon}.png`)}}
                              selectedIcon={{uri:require(`../../assets/images/nav/${nav.icon}-selected.png`)}}
                              selected={path===nav.path}
                              onPress={()=>this.props.history.replace(nav.path)}
                              tintColor='#1cae82'/>
                    ))
                }

            </TabBar>
        )
    }
}
//向外暴露withRouter()包装产生的组件
//内部会向组件中传入一些路由组件特有的属性：history/Location/match
export default withRouter(NavFooter)