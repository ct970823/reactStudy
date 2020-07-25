import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import MyNavLink from "../components/MyNavLink";
import News from './news'
import Message from './message'
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <h2>home component</h2>
                <div>
                    <ul className='nav nav-tabs'>
                        <li>
                            <MyNavLink to='/home/news'>News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to='/home/message'>Messages</MyNavLink>
                        </li>
                    </ul>
                    <div>
                        <Switch>
                            <Route path='/home/news' component={News}/>
                            <Route path='/home/message' component={Message}/>
                            <Redirect to='/Home/news'/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home