import React from 'react'
import {Card, Form, Input, Cascader, Button, message} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from "../../components/link-button/link-button";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
import {reqCategory,reqAddOrUpdateProduct} from "../../api";

const {Item} = Form
const {TextArea} = Input
/*
* product的添加和更新的子路由组件
* */
class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[]
        }
        // 获取表单实体
        this.formRef = React.createRef()
        //获取图片上传组件的实体
        this.pictureWallRef = React.createRef()
        // 获取富文本组件的实体
        this.richTextRef = React.createRef()
        // 取出携带的state
        const product = props.location.state
        console.log(product)
        //保存一个是否是更新的标识
        this.isUpdate = !!product

        // 保存商品（如果没有为{}）
        this.product = product || {}
        console.log(this.isUpdate,this.product)
    }

    // 根据category生成options数组
    initOptions = async (category) => {
        const options = category.map(item=>({
            value: item._id,
            label: item.name,
            isLeaf: false
        }))
        // 如果是一个二级分类商品的更新
        const {isUpdate,product} = this
        const {pCategoryId} = product
        if(isUpdate && pCategoryId !== '0'){
            // 获取对应二级分类列表
            const subCategory = await this.getCategory(pCategoryId)
            // 生成二级下拉列表options
            const childOptions = subCategory.map(item=>({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))
            //找到当前商品对应的一级option对象
            const targetOption = options.find(option=>option.value === pCategoryId)
            // 关联对应的一级options对象
            targetOption.children = childOptions
        }
        this.setState({options})
    }

    /*
    * 获取一级/二级分类列表
    * async 函数的返回值是新的promise对象,promise的结果和值由async的结果来决定
    * */
    getCategory = async (parentId) => {
        const result = await reqCategory(parentId)
        if(result.status === 0){
            const category = result.data
            //如果是一级分类
            if(parentId === 0){
                this.initOptions(category)
            }else{
                return category
            }
        }
    }

    // 用于加载下一级列表的回调函数
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0];
        // 显示loading
        targetOption.loading = true;
        // 发送请求
        const subCategory = await this.getCategory(targetOption.value)
        //隐藏loading
        targetOption.loading = false;
        if(subCategory && subCategory.length > 0){
            targetOption.children = subCategory.map(item=>({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))
        }else{
            // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }
        // 更新options状态
        this.setState({
            options: [...this.state.options],
        });
    };


    //提交表单
    submit = async ({ name,desc,price,categoryIds}) => {
        // 表单验证（成功）
        if(name && desc && price && categoryIds.length>0){
            //收集数据
            let categoryId,pCategoryId
            if(categoryIds.length === 1){
                categoryId = '0'
                pCategoryId = categoryIds[0]
            }else{
                categoryId = categoryIds[1]
                pCategoryId = categoryIds[0]
            }
            const imgs = this.pictureWallRef.current.getImgs()
            const detail = this.richTextRef.current.getDetail()
            let product = {
                name,
                desc,
                price,
                categoryId,
                pCategoryId,
                imgs,
                detail
            }
            //如果是更新，添加_id
            if(this.isUpdate){
                product._id = this.product._id
            }
            console.log(product)
            // 调用接口
            const result = await reqAddOrUpdateProduct(product)
            if(result.status === 0){
                message.success(`${this.isUpdate?'更新商品成功':'添加商品成功'}`)
                this.props.history.goBack()
            }else{
                message.error(`${this.isUpdate?'更新商品失败':'添加商品失败'}`)
            }
        }

    }

    componentDidMount() {
        this.getCategory(0)
    }

    render() {
        const {isUpdate,product} = this
        const {pCategoryId,categoryId,imgs,detail} = product
        // 用来接收级联分类id的数组
        const categoryIds = []
        if(isUpdate){
            // 商品是一级分类的商品
            if(pCategoryId === '0'){
                categoryIds.push(pCategoryId)
            }else{
                // 商品是二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }


        }
        const title = (
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span>{isUpdate?'修改商品':'添加商品'}</span>
            </span>
        )

        //指定Item布局的配置对象
        const formItemLayout = {
            labelCol:{span:3},//左侧label宽度
            wrapperCol:{span:8}//右侧包裹的宽度
        }

        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    initialValues={{
                        name:product.name,
                        desc:product.desc,
                        price:product.price,
                        categoryIds:categoryIds
                    }}
                    onFinish={this.submit}
                >
                    <Item label='商品名称' name="name" rules={[{ required: true, message: '请输入商品名称!' }]}>
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item
                        label='商品描述'
                        name='desc'
                        rules={[
                            { required: true, message: '请输入商品描述!' }
                        ]}>
                        <TextArea placeholder='请输入商品描述' autoSize/>
                    </Item>
                    <Item label='商品价格' name='price'  rules={[{ required: true, message: '请输入商品价格!' }]}>
                        <Input type='number' min={0} placeholder='请输入商品价格'  addonAfter="元"/>
                    </Item>
                    <Item label='商品分类' name='categoryIds' rules={[
                        { required: true, message: '请选择商品分类!' }
                    ]}>
                        <Cascader
                            placeholder='请选择商品分类'
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label='商品图片' name='img'>
                        <PicturesWall ref={this.pictureWallRef} imgs={imgs || []}/>
                    </Item>
                    <Item label='商品详情' name='detail' labelCol={{span:3}} wrapperCol={{span:20}}>
                        <RichTextEditor ref={this.richTextRef} detail={detail || ''}/>
                    </Item>
                    <Button type='primary' htmlType="submit"  onClick={this.submit}>提交</Button>
                </Form>
            </Card>
        )
    }
}

export default ProductEdit
/*
* 父组件调用子组件的方法
* 在父组件中通过ref得到子组件标签对消（也就是组件对象，调用其方法）
* */