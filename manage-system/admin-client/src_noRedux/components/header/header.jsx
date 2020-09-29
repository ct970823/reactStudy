import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Modal} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons'
// import {reqWeather} from "../../api";
import {formatDate} from '../../utils/dateUtils';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/link-button";
import './index.less'
class Header extends Component {

    state = {
        currentTime:formatDate(Date.now()),
        dayPictureUrl:'',//天气图片
        weather:''//天气文本
    }

    getTime = () => {
        //每隔一秒获取时间
        this.timer = setInterval(() => {
            const currentTime = formatDate(Date.now())
            this.setState({currentTime})
        })
    }

    // getWeather = async () => {
    //     const {dayPictureUrl,weather} = await reqWeather('杭州')
    //     console.log(dayPictureUrl,weather)
    //     this.setState({dayPictureUrl,weather})
    // }

    // 获取当前标题
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = ()=> {
        Modal.confirm({
            title: '提示?',
            icon: <ExclamationCircleOutlined />,
            content: '确认退出吗？',
            onOk:() => {
                // 删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                // 跳转到login
                this.props.history.replace('/login')
            }
        });
    }

    /*
    * 第一次render()之后执行一次
    * 一般在此执行异步操作：发ajax请求/启动定时器
    * */
    componentDidMount() {
        // 获取当前时间
        this.getTime()
        // 获取当前天气
        // this.getWeather()

    }

    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.timer)
    }


    render() {
        //,dayPictureUrl,weather
        const {currentTime} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    {/* eslint-disable-next-line no-script-url */}
                    {/*<span className='logout' onClick={this.logout}>退出</span>*/}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        {/*<img src={dayPictureUrl} alt="weather"/>*/}
                        {/*<span>{weather}</span>*/}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)