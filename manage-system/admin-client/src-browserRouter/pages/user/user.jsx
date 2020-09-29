import React, {Component} from 'react';
import {Card, Button, Table, Modal, Popconfirm, message} from "antd";
import LinkButton from "../../components/link-button/link-button";
import {formatDate} from "../../utils/dateUtils";
import {reqUsers, reqDeleteUser, reqAddOrUpdateUsers} from "../../api";
import UserForm from "./user-form";
/*
* 用户路由
* */
export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users:[],
            roles:[],
            loading:false,
            pageSize:10,
            isShow:false
        }
        this.initColumns()
    }
    // 初始化table表头
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:formatDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render: role_id=>this.roleNames[role_id]
            },
            {
                title: '操作',
                render:user=>(
                    <span>
                        <LinkButton onClick={()=>this.shopUpdate(user)}>修改</LinkButton>
                        <Popconfirm placement="top" title='确定要删除这个用户吗？' onConfirm={()=>this.deleteUser(user._id)} okText="确认" cancelText="取消">
                             <LinkButton>删除</LinkButton>
                        </Popconfirm>
                    </span>
                )
            }
        ]
    }

    //根据role的数组，生成包含所有角色名的对象（属性名用角色id值）
    initRoleNames = (roles) => {
        this.roleNames = roles.reduce((pre,role)=>{
            pre[role._id] = role.name
            return pre
        },{})
    }

    getUsers = async () => {
        this.setState({isLoading:true})
        const result = await reqUsers()
        this.setState({loading:false})
        if(result.status === 0){
            const {users,roles} = result.data
            this.initRoleNames(roles)
            this.setState({users,roles})
        }
    }

    showAdd = () => {
        this.user = null
        this.setState({isShow:true})
    }

    shopUpdate = (user) => {
        this.user = user
        this.setState({isShow:true})
    }

    // 添加/修改用户
    addOrUpdateUser = async () => {
        // 收集数据
        const form = this.form.current
        try{
            // 表单验证
            const user = await form.validateFields()
            // 隐藏确认框
            this.setState({
                isShow:false
            })
            // 收集数据
            if(this.user._id){
                user._id = this.user._id
            }
            form.resetFields()
            // 提交请求
            const result = await reqAddOrUpdateUsers(user)
            const content = this.user._id?'修改':'添加'
            if(result.status===0){
                message.success( `${content}用户成功`)
                this.getUsers()
            }else{
                message.error(`${content}用户失败`)
            }
        }catch(e){
            console.log(e)
        }

    }

    // 删除用户
    deleteUser = async (userId) => {
        const result = await reqDeleteUser(userId)
        if(result.status === 0){
            message.success('删除用户成功')
            await this.getUsers()
        }else{
            message.error('删除用户失败')
        }
    }


    componentDidMount() {
        this.getUsers()
    }

    render() {
        const {users,roles,loading,pageSize,isShow} = this.state
        const user = this.user || {}
        const title = <Button type='primary' onClick={()=>this.showAdd()}>创建角色</Button>

        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    bordered
                    loading={loading}
                    position={{defaultPageSize:pageSize}}
                />
                <Modal
                    title={user._id?'修改用户':'添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={()=>{
                        this.setState({isShow:false})
                        this.form.current.resetFields()
                    }}
                >
                    <UserForm
                        roles={roles}
                        user={user}
                        setForm={(form)=>this.form = form}
                    />
                </Modal>
            </Card>
        )
    }
}