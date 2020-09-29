import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/images/logo.png'
import memoryUtils from "../../utils/memoryUtils";
const { SubMenu } = Menu
class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.menuNodes = this.getMenuNodes(menuList)
    }

    /*
    * 根据menu的数据数组生成对应的标签数组
    * */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={item.icon}>

                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            // 递归调用
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }



        })
    }


    /*
        * 使用reduce累加
        * 语法：
        * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        *   - total:初始值（必填）
        *   - currentValue：当前元素（必填）
        *   - currentIndex：当前元素索引（可选）
        *   - arr：当前元素所属对象（可选）
        *   - initialValue:初始值（可选）
        * 菜单列表初始值为空数组
        * 遍历判断当前元素是否存在children
        *   - 如果没有，添加<Menu.Item>元素
        *   - 如果有，添加<SubMenu>
        *       - SubMenu中可能存在Menu.Item，所有，递归遍历
        * */
    getMenuNodes = (menuList) => {
        return menuList.reduce((pre,item) => {
            // 如果当前用户有item权限，显示对应的菜单项
            if(this.hasAuth(item)){
                if(!item.children){
                    // 向pre添加<Menu.Item>
                    pre.push((
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    ))
                }else{
                    // 向pre添加<SubMenu>
                    //得到当前请求的路由路径
                    const path = this.props.location.pathname
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
                    // 如果存在，说明当前item的字列表需要打开
                    if(cItem){
                        this.openkey = item.key
                    }
                    pre.push((
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {
                                // 递归调用
                                this.getMenuNodes(item.children)
                            }
                        </SubMenu>
                    ))
                }
            }

            //一定要返回pre
            return pre
        },[])
    }

    // 判断当前登录用户对item是否有权限
    hasAuth = (item) =>{
        const {key,isPublic} = item
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
        if(username === 'admin' || isPublic || menus.indexOf(key) !== -1){
            return true
        }else if(item.children){
            return !!item.children.find(child=>menus.indexOf(child.key) !== -1)
        }
        return false
    }

    render() {
        //得到当前请求的路由路径
        let path = this.props.location.pathname
        if(path.indexOf('/product')===0){
            path = '/product'
        }
        // 得到需要打开的菜单项的key
        const openKey = this.openkey
        console.log(openKey)
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt=""/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>

        )
    }
}

/*
* withRouter高阶组件
* 包装非路由组件，返回一个新组件
* 新的组件向非路由组件传递3个属性：history/Location/match
* */
export default withRouter(LeftNav)