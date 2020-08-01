import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Switch,Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from "./redux/store";

import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";
ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                {/*默认路由*/}
                <Route component={Main} />
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))