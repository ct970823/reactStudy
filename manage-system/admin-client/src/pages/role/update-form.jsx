import React from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Tree} from "antd";
import menuList from "../../config/menuConfig";
const Item = Form.Item
/*
* 添加分类的form组件
* */
class UpdateForm extends React.Component {
    formRef = React.createRef()
    static propTypes = {
        role:PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        const {menus}  = this.props.role
        this.state = {
            checkedKeys:menus
        }
        // 树形图列表
        this.treeData = [
            {
                title:'平台权限',
                key:'all',
                children:this.getTreeNodes(menuList)
            }
        ]
    }
    // 根据菜单生成树形图的结构
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre,item) => {
            pre.push(
                {
                    title:item.title,
                    key:item.key,
                    children:item.children?this.getTreeNodes(item.children):null
                }
            )
            return pre
        },[])
    }

    onCheck = (checkedKeys) => {
        this.setState({checkedKeys})
    };

    // 获取当前选中的菜单
    getMenus = () => this.state.checkedKeys

    render() {
        const {role} = this.props
        const {checkedKeys} = this.state
        return (
            <Form ref={this.formRef} key={new Date()}>
                <Item label='角色名称'>
                    <Input value={role.name} disabled />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />
            </Form>
        )
    }
}

export default UpdateForm