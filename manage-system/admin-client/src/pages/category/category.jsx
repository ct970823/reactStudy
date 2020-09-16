import React, {Component} from 'react';
import {Card, Table, Button, Space, message, Modal} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'
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
        showStatus:0//
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
                        <LinkButton>修改分类</LinkButton>
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
    getCategory = async () => {
        //显示loading
        this.setState({loading: true})
        const {parentId} = this.state
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

    componentDidMount() {
        //获取一级列表
        this.getCategory()
    }


    render() {
        // 数据
        const {category, subCategory, parentId, parentName, loading} = this.state
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
            <Button type='primary' icon={<PlusOutlined/>}>
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
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal
                    title="修改分类"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </Card>

    )
    }
}