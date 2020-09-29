import React from 'react'
import {Card,List} from "antd";
import LinkButton from "../../components/link-button/link-button";
import {ArrowLeftOutlined} from "@ant-design/icons";
import './product.less'
import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategoryById} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
const Item = List.Item
/*
* product的详情子路由组件
* */
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cName1:'',//一级分类名称
            cName2:''//二级分类名称
        }
    }

    async componentDidMount() {
        const {pCategoryId,categoryId} = memoryUtils.product
        if(pCategoryId === '0'){
            // 一级分类下的商品
            const result = await reqCategoryById(categoryId)
            const cName1 = result.data.name
            this.setState({cName1})
        }else{
            // 二级分类下的商品
            /*
            * 通过多个await方式发多个请求：后面的请求是在前一个请求成功返回之后才发生
            *   const result1 = await reqCategoryById(pCategoryId)
            *   const result2 = await reqCategoryById(categoryId)
            *   const cName1 = result1.data.name
            *   const cName2 = result2.data.name
            *   this.setState({cName1,cName2})
            *
            * */
            /*
            * Promise.all() 一次性发生多个请求，只有都成功了，才正常处理
            * */
            const results = await Promise.all([reqCategoryById(pCategoryId),reqCategoryById(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({cName1,cName2})
        }
    }
    componentWillUnmount() {
        memoryUtils.product = {}
    }

    render() {
        const {name,desc,price,detail,imgs} = memoryUtils.product
        const {cName1,cName2} = this.state
        const title = (
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <div>
                            <span className='product-detail-left'>商品名称:</span>
                            <span>{name}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className='product-detail-left'>商品描述:</span>
                            <span>{desc}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className='product-detail-left'>商品价格:</span>
                            <span>{price}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className='product-detail-left'>所属分类:</span>
                            <span>{cName1}{cName2?' --> '+cName2:''}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className='product-detail-left'>商品图片:</span>
                            <span>
                                {
                                    imgs.map((img,index)=>(
                                        <img src={BASE_IMG_URL+img} alt={'img'+index} className='product-img' key={index}/>
                                    ))
                                }
                            </span>
                        </div>
                    </Item>
                    <Item>
                        <div style={{display:'flex'}}>
                            <span className='product-detail-left'>商品详情:</span>
                            <span dangerouslySetInnerHTML={{__html: detail}} />
                        </div>
                    </Item>
                </List>
            </Card>
        )
    }
}

export default ProductDetail