import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from "antd";
import {reqRoles,reqAddRole,reqUpdateRole} from "../../api";
import AddForm from "../role/add-form";
import UpdateForm from "./update-form";
import memoryUtils from "../../utils/memoryUtils";
import {formatDate} from "../../utils/dateUtils";
/*
* 角色路由
* */
export default class Role extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles:[],//角色列表
            role:{},//选中的角色数据
            pageSize:10,//每页条数
            loading:false,//是否显示loading
            isShowAdd:false,//添加角色弹窗标识
            isShowAuth:false//设置角色权限弹窗标识
        }
        this.auth = React.createRef()
        this.initColumns()
    }

    // 初始化table表头
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:formatDate
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render:formatDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name'
            }
        ]
    }


    onRow = (role) => {
        return {
            onClick:event => {
                this.setState({role})
            }
        }
    }


    //添加角色
    addRole = async () => {
        // 收集数据
        const form = this.form.current

        try{
            const values = await form.validateFields()
            // 隐藏确认框
            this.setState({
                isShowAdd:false
            })
            // 收集数据
            const {roleName} = values
            form.resetFields()
            // 提交请求
            const result = await reqAddRole(roleName)
            if(result.status===0){
                message.success('添加角色成功')
                this.getRoles()
            }else{
                message.error('添加角色失败')
            }
        }catch(e){
            console.log(e)
        }
    }


    // 设置角色权限
    updateRole = async () => {
        this.setState({isShowAuth:false})
        const role = this.state.role
        // 得到最新的menus
        role.menus = this.auth.current.getMenus()
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        const result = await reqUpdateRole(role)
        if(result.status === 0){
            message.success('更新角色成功')
            this.setState({
                roles:[...this.state.roles]
            })
        }else{
            message.error('更新角色成功')
        }
    }

    getRoles = async () => {
        this.setState({
            loading:true
        })
        const result = await reqRoles()
        this.setState({loading:false})
        if(result.status===0){
            this.setState({
                roles:result.data
            })
        }
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        const {roles,role,loading,pageSize} = this.state
        const title = (
            <span>
                <Button
                    type='primary'
                    onClick={()=> {this.setState({isShowAdd: true})}}
                >
                    创建角色
                </Button> &nbsp;&nbsp;
                <Button
                    type='primary'
                    disabled={!role._id}
                    onClick={()=> {this.setState({isShowAuth: true})}}
                >
                    设置角色权限
                </Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    bordered
                    loading={loading}
                    rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                    position={{
                        defaultPageSize:pageSize,
                        showQuickJumper:true,
                        onChange:this.getRoles
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={this.state.isShowAdd}
                    onOk={this.addRole}
                    onCancel={()=>{
                        this.setState({isShowAdd:false})
                        this.form.current.resetFields()
                    }}
                >
                    <AddForm
                        setForm={(form)=>this.form = form}
                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={this.state.isShowAuth}
                    onOk={this.updateRole}
                    onCancel={()=>{
                        this.setState({isShowAuth:false})
                    }}
                >
                    <UpdateForm
                        role={role}
                        ref={this.auth}
                    />
                </Modal>
            </Card>
        )
    }
}