import React from 'react'
import {connect} from 'react-redux'
import UserList from "../../components/user-list/user-list";
import {getUserList} from "../../redux/actions";

class Dashen extends React.Component {
    state = {}

    componentDidMount() {
        //获取老板的列表
        this.props.getUserList('laoban')
    }

    render() {
        const {userList} = this.props
        return (
            <UserList userList={userList}/>
        )
    }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Dashen)