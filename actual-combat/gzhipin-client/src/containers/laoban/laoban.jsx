import React from 'react'
import {connect} from 'react-redux'
import UserList from "../../components/user-list/user-list";
import {getUserList} from "../../redux/actions";
class Laoban extends React.Component {
    componentDidMount() {
        //获取老板的列表
        this.props.getUserList('dashen')
    }

    render() {
        // const {userList} = this.props
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Laoban)