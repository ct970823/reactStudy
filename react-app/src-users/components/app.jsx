import React from 'react'
//引入组件
import Search from "./search";
import Main from "./main";
class app extends React.Component {

    state = {
        searchName:''
    }

    setSearchName = (searchName) => {
        this.setState({searchName})
        // this.setSearchName = searchName
    }

    render() {
        const {searchName} = this.state
        return (
            <div className="container">
                <Search setSearchName={this.setSearchName}/>
                <Main searchName={searchName}/>
            </div>
        )
    }
}

export default app