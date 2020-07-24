import React from 'react'
import PubSub from 'pubsub-js'
class Search extends React.Component {


    handleSearch = () => {
        //获取输入值
        const searchName = this.input.value.trim()
        //判断
        if(searchName){
            //搜索
            //发布消息
            PubSub.publish('search',searchName)
        }
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="enter the name you search" ref={input => this.input = input}/>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
            </section>
        )
    }
}

export default Search