import React from 'react'
import './index.less'
/*
* 外形像链接的按钮
* */
class LinkButton extends React.Component {

    render() {

        return (
            <button {...this.props} className='link-button'>{this.props.children}</button>
        )
    }
}

export default LinkButton