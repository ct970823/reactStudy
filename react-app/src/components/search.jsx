import React, { useState} from 'react'
import PubSub from 'pubsub-js'
function Search () {
    const [searchText,setSearchText] = useState('')
    function handleSearch () {
        //判断
        if(searchText){
            //搜索
            //发布消息
            PubSub.publish('search',searchText)
        }
    }
    return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                <input type="text" placeholder="enter the name you search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <button onClick={handleSearch}>Search</button>
            </div>
        </section>
    )
}

export default Search
