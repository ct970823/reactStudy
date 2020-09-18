import React, {Component} from 'react';
import {Card, Table, Button, Space, message, Modal} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'
import AddForm from "./add-form";
import UpdateForm from './update-form';
import {reqCategory, reqAddCategory, reqUpdateCategory} from "../../api";
import LinkButton from '../../components/link-button/link-button'
/*
* 商品分类路由
* */
export default class Category extends Component {
    constructor(props) {
        super(props);
        this.initColumns()
    }

    state = {
        category: [],//一级分类列表
        subCategory: [],//二级分类列表
        loading: false,//是否加载中
        parentId: '0',//当前需要显示的分类列表的父分类id
        parentName: '',//当前需要显示的分类列表的父分类名称
        showStatus:0//新增/修改弹窗显示、隐藏标识 0：隐藏 1：新增显示 2：修改显示
    }

    // 初始化table表头
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '操作',
                width: '300px',
                key: 'action',
                render: (text) => (
                    /*
                    * text：为当前行的值
                    * record：当前行数据
                    * index：行索引
                    * */
                    <Space size="middle">
                        <LinkButton onClick={()=>this.showUpdate(text)}>修改分类</LinkButton>
                        {
                            this.state.parentId === '0' ?
                                <LinkButton onClick={() => this.showSubCategory(text)}>查看子分类</LinkButton> : null
                        }
                    </Space>
                ),
            }
        ]
    }
    //显示二级分类
    showSubCategory = (category) => {
        const {name, _id} = category
        //更新状态 setState有回调函数
        //setState是异步更新状态
        this.setState({
            parentId: _id,
            parentName: name
        }, () => {
            //获取二级分类列表
            this.getCategory()
        })

    }

    //获取一级/二级列表
    getCategory = async (parentId) => {
        //显示loading
        this.setState({loading: true})
        parentId = parentId || this.state.parentId
        //获取数据
        const res = await reqCategory(parentId)
        console.log(res)
        //判断是否成功
        if (res.status === 0) {
            //取出分类数组（可能是一级也可能是二级）
            const category = res.data
            if (parentId === '0') {
                //更新一级分类状态
                this.setState({category})
            } else {
                //更新二级分类状态
                this.setState({subCategory: category})
            }

        } else {
            message.error('获取分类列表失败')
        }
        //隐藏loading
        this.setState({loading: false})
    }

    //显示一级分类列表
    showCategory = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategory: []
        })
    }

    // 关闭弹窗
    handleCancel = () => {
        const form = this.form.current
        // 清除输入数据
        form.resetFields()
        this.setState({
            showStatus:0
        })
    }

    //显示添加的确认框
    showAdd = () => {
        this.setState({
            showStatus:1
        })
    }

    //添加分类
    addCategory = async () => {
        // 获取form实体
        const form = this.form.current
        console.log(form)
        //表单验证
        try{
            const values = await form.validateFields()
            // 隐藏确认框
            this.setState({
                showStatus:0
            })
            // 收集数据

            // const {parentId,categoryName} = form.getFieldsValue()
            const {parentId,categoryName} = values
            form.resetFields()
            // 提交请求
            const result = await reqAddCategory(parentId,categoryName)
            if(result.status===0){
                if(parentId===this.state.parentId){
                    // 重新显示列表
                    this.getCategory()
                }else if(parentId==='0'){
                    // 在二级分类列表下添加一级分类，需重新获取一级分类列表，单不需要显示一级列表
                    this.getCategory('0')

                }
            }
        }catch(e){

        }
    }

    // 显示修改的确认框
    showUpdate = (category) => {
        //保存分类对象
        this.currentCategory = category
        this.setState({
            showStatus:2
        })
    }

    //更新分类
    updateCategory = async () => {
        // 表单验证
        const form = this.form.current
        const values = await form.validateFields()
        try{
            // 隐藏确认框、
            this.setState({
                showStatus:0
            })

            // 准备数据
            const categoryId = this.currentCategory._id
            // const {categoryName} = form.getFieldsValue('categoryName')
            const {categoryName} = values
            // 清除输入数据
            form.resetFields()
            // 发请求更新分类
            const result = await reqUpdateCategory({categoryId,categoryName})
            if(result.status === 0){
                // 重新显示列表
                this.getCategory()
            }
        }catch(e){

        }


    }

    componentDidMount() {
        //获取一级列表
        this.getCategory()
    }


    render() {
        // 数据
        const {category, subCategory, parentId, parentName, loading} = this.state
        const currentCategory = this.currentCategory || {}
        //左侧标题
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginLeft: '10px', marginRight: '5px'}}/>
                <span>{parentName}</span>
            </span>
        )
        //右侧按钮
        const extra = (
            <Button type='primary' icon={<PlusOutlined/>} onClick={this.showAdd}>
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={parentId === '0' ? category : subCategory}
                    bordered
                    rowKey='_id'
                    loading={loading}
                    position={{defaultPageSize: 5, showQuickJumper: true}}
                />
                <Modal
                    title="添加分类"
                    visible={this.state.showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        category={category}
                        parentId={parentId}
                        setForm={(form)=>this.form=form}
                    />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={this.state.showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryName={currentCategory.name || ''}
                        setForm={(form)=>this.form=form}
                    />
                </Modal>
            </Card>

    )
    }
}