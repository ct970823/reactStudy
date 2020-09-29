import React, {Component} from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import ProductHome from "./product-home";
import ProductEdit from "./product-edit";
import ProductDetail from "./product-detail";
/*
* 商品路由
* */
export default class Product extends Component {

    render() {
        return (
            <Switch>
                {/*exact:路径完全匹配*/}
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/edit' component={ProductEdit} />
                <Route path='/product/detail' component={ProductDetail}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}