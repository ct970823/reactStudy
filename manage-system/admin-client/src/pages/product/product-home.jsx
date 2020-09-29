import React from 'react'
import {Card, Select, Input, Button, Table, Space,message} from "antd";
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from "../../components/link-button/link-button";
import {reqProducts,reqSearchProducts,reqUpdateProductStatus} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
const Option = Select.Option
/*
* product的主页面子路由组件
* */
class ProductHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],//商品列表
            pageSize:10,//每页条数
            total:0,//总条数
            loading:false,//是否显示loading
            searchName:'',//搜索关键字
            searchType:'productName'//搜索类型
        }
        this.initColumns()
    }

    // 初始化table表头
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(status)=>status===1?'在售':'已下架'
            },
            {
                title: '操作',
                width: '300px',
                key: 'action',
                render: (product) => (
                    /*
                    * text：为当前行的值
                    * record：当前行数据
                    * index：行索引
                    * */
                    <Space size="middle">
                        <LinkButton onClick={()=>this.updateStatus(product._id,product.status)}>{product.status===1?'下架':'上架'}</LinkButton>
                        <LinkButton onClick={()=>this.showDetail(product)}>详情</LinkButton>
                        <LinkButton onClick={()=>this.showUpdate(product)}>修改</LinkButton>
                    </Space>
                )
            }
        ]
    }


    // 详情
    showDetail = (product) => {
        //缓存product对象
        memoryUtils.product = product
        this.props.history.push('/product/detail')
    }
    //修改
    showUpdate = (product) => {
        //缓存product对象
        memoryUtils.product = product
        this.props.history.push('/product/edit')
    }

    //获取列表数据
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({
            loading:true
        })
        const {pageSize,searchName,searchType} = this.state
        //判断是否有关键值
        let result
        if(searchName){
            result = await reqSearchProducts({pageNum,pageSize,searchName,searchType})
        }else{
            result = await reqProducts(pageNum,pageSize)
        }
        this.setState({loading:false})
        if(result.status===0){
            const {total,list} = result.data
            this.setState({
                products:list,
                total
            })
        }
    }


    updateStatus = async (productId,status) => {
        status = status === 1?2:1
        const result = await reqUpdateProductStatus(productId,status)
        if(result.status === 0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }else{
            message.error('更新商品失败')
        }
    }

    componentDidMount() {
        this.getProducts(1)
    }


    render() {
        const {products,pageSize,total,loading,searchType,searchName} = this.state
        const title = (
            <span>
                <Select
                    value={searchType}
                    onChange={value=>this.setState({searchType:value})}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='请输入关键字'
                    style={{width:'200px',margin:'0 10px'}}
                    value={searchName}
                    onChange={event=>this.setState({searchName:event.target.value})}
                />
                <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/product/edit')}>
                <PlusOutlined />
                添加商品
            </Button>
        )


        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    loading={loading}
                    position={{
                        defaultPageSize:pageSize,
                        showQuickJumper:true,
                        total,
                        current:this.pageNum,
                        onChange:this.getProducts
                    }}
                />
            </Card>
        )
    }
}

export default ProductHome