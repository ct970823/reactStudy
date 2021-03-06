import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {WingBlank,WhiteSpace,Card} from "antd-mobile";
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body
class UserList extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    state = {}

    render() {
        const {userList} = this.props
        return (
            <WingBlank style={{marginTop: 50,marginBottom:50}}>
                <QueueAnim type='scale'>
                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace/>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        thumb={user.header?require(`../../assets/images/headers/${user.header}.png`):require(`../../assets/images/headers/头像1.png`)}
                                        extra={user.username}
                                    />
                                    <Body>
                                        <div>职位: {user.post}</div>
                                        {user.company ? <div>公司: {user.company}</div> : null}
                                        {user.salary ? <div>月薪: {user.salary}</div> : null}
                                        <div>描述: {user.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)