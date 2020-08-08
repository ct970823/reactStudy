/*对话聊天的路由组件
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'

const Item = List.Item

class Chat extends Component {

    constructor(props) {
        super(props);
        // 初始化表情列表数据
        //表情地址 https://emojipedia.org
        const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍',
            '🤩', '😘', '😗', '☺', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
            '🤨', '😐', '😑', '😶', '😏', '😒', '🙄']
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }
    state = {
        content: '',
        isShow: false//是否显示表情
    }

    //第一次render()之前回调
    // componentDidMount() {
    // }
    componentDidMount() {
        //初始化显示列表（到列表底部)
        window.scrollTo(0,document.body.scrollHeight)

        // 发送请求，更新消息的未读数量
        const to = this.props.user._id
        const from = this.props.match.params.userid
        this.props.readMsg(from,to)
    }

    componentDidUpdate() {
        //列表更新
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentWillUnmount() {//退出之前调用
        // 发送请求，更新消息的未读数量
        const to = this.props.user._id
        const from = this.props.match.params.userid
        this.props.readMsg(from,to)
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow){
            // 异步手动派发resize事件，解决表情列表显示的bug
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // 发送消息
        if (content) {
            this.props.sendMsg({from, to, content})
        }
        // 清除数据
        this.setState({content: '',isShow:false})
    }


    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        //计算当前两天的chatId
        const meId = user._id
        if (!users[meId]) {
            return null //如果没有获取数据，不做任何显示
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        //对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/headers/${targetHeader}.png`) : null
        const ownHeader = users[meId].header
        const ownIcon = ownHeader ? require(`../../assets/images/headers/${ownHeader}.png`) : null
        return (
            <div id='chat-page'>
                <NavBar className='sticky-header' icon={<Icon type="left"/>} onLeftClick={() => this.props.history.goBack()}>{users[targetId].username}</NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    {
                        msgs.map(msg => {
                            if (targetId === msg.from) {
                                //对方发给我的
                                return (
                                    <Item
                                        key={msg._id}
                                        thumb={targetIcon}
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            } else {
                                //我发给对方的
                                return (
                                    <Item
                                        key={msg._id}
                                        className='chat-me'
                                        // thumb={ownIcon}
                                        extra={
                                            <img src={ownIcon} alt="头像"/>
                                        }
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onFocus={() => this.setState({isShow: false})}
                        onChange={value => this.setState({content: value})}
                        extra={
                            <span>
                                <span className='look' role='img' aria-label='emoji' onClick={this.toggleShow}>😃</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg,readMsg}
)(Chat)