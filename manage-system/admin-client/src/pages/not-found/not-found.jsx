import React from 'react'
import {Result,Button} from "antd";
import {connect} from 'react-redux'
import {setHeadTitle} from "../../redux/actions";

class NotFound extends React.Component {
    state = {}

    goBack = () => {
        this.props.setHeadTitle('首页')
        this.props.history.replace('/home')
    }

    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在。"
                extra={<Button type="primary" onClick={this.goBack}>回到首页</Button>}
            />
        )
    }
}

export default connect(
    state=>({}),
    {setHeadTitle}
)(NotFound)