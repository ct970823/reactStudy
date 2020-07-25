import React from 'react'
import {NavLink} from "react-router-dom";
class MyNavLink extends React.Component {
    render() {
        //{...this.props}:将外部传入的所有属性传递给NavLink
        return <NavLink {...this.props} activeClassName='activeClass' />
    }
}

export default MyNavLink