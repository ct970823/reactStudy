import React, {Component} from 'react';
import {Card,Button} from "antd";
import ReactEcharts from "echarts-for-react";
/*
* 柱状图路由
* */
export default class Bar extends Component {

    state = {
        sales:[5, 20, 36, 10, 10, 20],
        stores:[30, 15, 5, 20, 20, 10]
    }

    chartsUpdate = () => {
        this.setState((state)=>({
            sales:state.sales.map(sale=>sale+1),
            stores:state.stores.map(store=>store-1)
        }))
    }

    // 返回图表配置对象
    getOption = (sales,stores) => {
        return  {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            },{
                name: '库存',
                type: 'bar',
                data: stores
            }]
        }
    }

    render() {
        const {sales,stores} = this.state
        const title = <Button type='primary' onClick={this.chartsUpdate}>更新</Button>
        return (
            <Card title={title}>
                <ReactEcharts option={this.getOption(sales,stores)} />
            </Card>
        )
    }
}