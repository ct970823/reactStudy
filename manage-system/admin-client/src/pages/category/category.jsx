import React, {Component} from 'react';
import {Card, Table, Button, Space, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {reqCategory,reqAddCategory,reqUpdateCategory} from "../../api";
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
        category:[],//一级分类列表
        subCategory:[],//二级分类列表
        loading:false,//是否加载中
        parentId:'0',//当前需要显示的分类列表的父分类id
        parentName:''//当前需要显示的分类列表的父分类名称
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
                width:'300px',
                key: 'action',
                render: (text) => (
                    /*
                    * text：为当前行的值
                    * record：当前行数据
                    * index：行索引
                    * */
                    <Space size="middle">
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton onClick={()=>this.showSubCategory(text)}>查看子分类</LinkButton>
                    </Space>
                ),
            }
        ]
    }

    showSubCategory = (category) => {
        const {name,_id} = category
        //更新状态
        this.setState({parentId:_id,parentName:name})
        //获取二级分类列表
        this.getCategory()
    }

    //获取一级/二级列表
    getCategory = async () => {
        //显示loading
        this.setState({loading:true})
        const {parentId} = this.state
        //获取数据
        const res = await reqCategory(parentId)
        console.log(res)
        //判断是否成功
        if(res.status === 0){
            //取出分类数组（可能是一级也可能是二级）
            const category = res.data
            if(parentId === '0'){
                //更新一级分类状态
                this.setState({category})
            }else{
                //更新二级分类状态
                this.setState({subCategory:category})
            }

        }else{
            message.error('获取分类列表失败')
        }
        //隐藏loading
        this.setState({loading:false})
    }


    componentDidMount() {
        //获取一级列表
        this.getCategory()
    }


    render() {
        //左侧标题
        const title = '一级分类列表'
        //右侧按钮
        const extra = (
            <Button type='primary' icon={<PlusOutlined />}>
                添加
            </Button>
        )
        // 数据
        const {category,loading} = this.state
        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={category}
                    bordered
                    rowKey='_id'
                    loading={loading}
                    position={{defaultPageSize:5,showQuickJumper:true}}
                />
            </Card>
        )
    }
}