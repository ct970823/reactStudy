# react学习

### 创建虚拟dom

1. 普通方式

```html

<script type="text/javascript">
    const msg = 'I Like You!'
    const myId = 'testId'
    // 创建虚拟DOM 标签，标签属性 标签内容
    const vDom = React.createElement('h2', { id: myId.toLowerCase() }, msg.toUpperCase())
    // 渲染虚拟DOM
    ReactDOM.render(vDom, document.getElementById('test1'))
</script>
```

2. JSX方式（注意：type是text/babel 因为需要babel来解析jsx）

```html

<script type="text/babel">
    const vDom2 = <h1 id={ myId.toUpperCase() }>{ msg.toLowerCase() }</h1>
    ReactDOM.render(vDom2, document.getElementById('test2'))
</script>
```

### 自定义组件

1. 工厂函数组件（简单组件）

```jsx
function MyComponent() {
	return <h2>工厂函数组件(简单组件)</h2>
}

ReactDOM.render(<MyComponent/>, document.getElementById('example1'))
```

2. ES6类组件（复杂组件）

```jsx
class MyComponent2 extends React.Component {
	render() {
		return <h2> ES6类组件（复杂组件）</h2>
	}
}

ReactDOM.render(<MyComponent2/>, document.getElementById('example2'))
```

### 事件

1. 通过onXxx属性指定事件处理函数（注意大小写）
    1. React使用的是自定义（合成）事件，而不是使用的原生DOM事件，这是为了更好的兼容性
    2. React中的事件是通过事件委托的方式处理的（委托给最外层的元素），这是为了高效
2. 通过event.target得到发生事件的DOM元素对象

### input取值和方法回调

```html
//如果是class
//constructor(props) {
//    super(props);
//    //需要为函数绑定this，这样才能使用this
//    this.showInput = this.showInput.bind(this)
//}
//也可以使用箭头函数
showInput = () => {
const input = this.refs.content
alert(input.value)
alert(this.input.value)
}


//ref中直接放一个变量值
<input type="text" ref="content"/>
//ref中放回调函数
<input type="text" ref={input=>this.input = input}/>
//通过onClick来绑定回调函数（注意，必须是this.xxx）
<button onClick={this.showInput}>提示输入</button>
```

### ref

1. string形式的ref (过时的API)
   ```jsx
        class xxx extends  React.Component {
            showInput = () => {
               const input = this.refs.content
               alert(input.value)
           }
            
            render () {
                return (
                    <div>
                        <input type="text" ref="content"/>
                        <button onClick={this.showInput}>提示输入</button>
                    </div>
                )
            }		
        }	
       
   ```
2. 回调函数形式的ref (
   常用的API，面试点：如果回调函数是以内联函数的方式定义的，在更新时，会被执行两次，第一次传入null，第二次传入参数DOM元素，这是因为每次渲染时会创建一个新的函数实例，所以React会清空旧的并且设置新的。想要避免的话，可以使用内联函数定义成class的绑定函数的方式，实际上，大多数情况下他是没有影响的。)
   ```jsx
       class xxx extends  React.Component {
            state = {
               flag:true
            }		
            showInput = () => {
               const {input1} = this
               alert(input1)
            }
            inputChange = (c) => {
                this.input1 = c;
                console.log(111)
            }
            render() {
               const { flag } = this.state
               return (
                   <div>
                       <h4>今天天气真{flag ? '炎热' : '凉爽'}</h4>
                       {/*<input type="text" ref="{(c)=>{this.input1 = c;console.log(111)}"/>*/}
                        <input type="text" ref="{this.inputChange}/>
                       <button onClick={this.showInput}>提示输入</button>
                       <button onClick={this.showInput}>更换天气</button>
                   </div> 
               )
           }	
       }	
   
   ```
3. createRef API 形式的ref(React.createRef 调用后可以返回一个容器，该容器可以存储被ref所标识的节点，但是该容器是"专人专用"的，如果需要多个值，就定义多个)
   ```jsx
        class xxx extends React.Component {
	        myRef = React.createRef()
	        myRef2 = React.createRef()
   
            showInput = () => {
               alert(this.myRef.current.value)
               alert(this.myRef2.current.value)
            }
            
            render () {
                return (
                    <div>
                        <input type="text" ref="{this.myRef}"/>
                        <input type="text" ref="{this.myRef2}"/>
                        <button onClick={this.showInput}>提示输入</button>
                    </div> 
                )
            }		
        }  
          
   ```

### state状态

1. 放在constructor中

    ```jsx
        class xxx extends React.Component {
            constructor(props) {
                super(props);
                //初始化状态
                this.state = {
                    pwd: ''
                }
            }
        }
    
    ```

2. 直接写在class中

    ```jsx
        class xxx extends React.Component {
            state = {
                pwd: ''
            }
        }
    
    ```

### 受控组件和非受控组件 （推荐使用受控组件，因为可以减少ref的使用）

1. 受控组件(每次发生改变时，都会去调用)
    ```jsx
    class xxx extends React.Component {
        state = {
            username:'',
            password:''
        }
        handleSubmit = () => {
            console.log(`你输入的用户名是${username}，密码是${password}`);
        }
        
        render() {
            return(
                <from onSubmit={this.handleSubmit}>
                    用户名：<input type="text" onChange={e=>this.setState({username:e.target.value})} name="username"/><br>
                    密码：<input type="text" onChange={e=>this.setState({password:e.target.value}} name="password"/>
                </from>
            )
        }
    }
    ```

3. 非受控组件（随调随取，调用时再去取值）
    ```jsx
    class xxx extends React.Component {
        handleSubmit = () => {
            console.log(`你输入的用户名是${this.username.value}，密码是${this.password.value}`);
        }
        
        render() {
            return(
                <from onSubmit={this.handleSubmit}>
                    用户名：<input type="text" ref={c=>this.username = c} name="username"/><br>
                    密码：<input type="text" ref={c=>this.password = c} name="password"/>
                </from>
            )
        }
    }
    ```

### 生命周期 ([生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/))

1. 旧版本
    1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
        1. constructor()
        2. componentWillMount()
        3. render()
        4. componentDidMount() =====> 常用 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
    2. 更新阶段: 由组件内部this.setSate()或父组件render触发
        1. shouldComponentUpdate()
        2. componentWillUpdate()
        3. render() =====> 必须使用的一个
        4. componentDidUpdate()
    3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
        1. componentWillUnmount()  =====> 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
    4. 注意：在16.3版本时为不安全的生命周期引入别名（这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。） UNSAFE_componentWillMount、UNSAFE_componentWillReceiveProps 和 UNSAFE_componentWillUpdate
    ```jsx
        //创建组件
        class Count extends React.Component{

            //构造器
            constructor(props){
                console.log('Count---constructor');
                super(props)
                //初始化状态
                this.state = {count:0}
            }

            //加1按钮的回调
            add = ()=>{
                //获取原状态
                const {count} = this.state
                //更新状态
                this.setState({count:count+1})
            }

            //卸载组件按钮的回调
            death = ()=>{
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            //强制更新按钮的回调
            force = ()=>{
                this.forceUpdate()
            }

            //组件将要挂载的钩子
            componentWillMount(){
                console.log('Count---componentWillMount');
            }

            //组件挂载完毕的钩子
            componentDidMount(){
                console.log('Count---componentDidMount');
            }

            //组件将要卸载的钩子
            componentWillUnmount(){
                console.log('Count---componentWillUnmount');
            }

            //控制组件更新的“阀门”
            shouldComponentUpdate(){
                console.log('Count---shouldComponentUpdate');
                return true
            }

            //组件将要更新的钩子
            componentWillUpdate(){
                console.log('Count---componentWillUpdate');
            }

            //组件更新完毕的钩子
            componentDidUpdate(){
                console.log('Count---componentDidUpdate');
            }

            render(){
                console.log('Count---render');
                const {count} = this.state
                return(
                    <div>
                        <h2>当前求和为：{count}</h2>
                        <button onClick={this.add}>点我+1</button>
                        <button onClick={this.death}>卸载组件</button>
                        <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
                    </div>
                )
            }
        }
		
        //父组件A
        class A extends React.Component{
            //初始化状态
            state = {carName:'奔驰'}

            changeCar = ()=>{
                this.setState({carName:'奥拓'})
            }

            render(){
                return(
                    <div>
                        <div>我是A组件</div>
                        <button onClick={this.changeCar}>换车</button>
                        <B carName={this.state.carName}/>
                    </div>
                )
            }
        }
		
        //子组件B
        class B extends React.Component{
            //组件将要接收新的props的钩子
            componentWillReceiveProps(props){
                console.log('B---componentWillReceiveProps',props);
            }

            //控制组件更新的“阀门”
            shouldComponentUpdate(){
                console.log('B---shouldComponentUpdate');
                return true
            }
            //组件将要更新的钩子
            componentWillUpdate(){
                console.log('B---componentWillUpdate');
            }

            //组件更新完毕的钩子
            componentDidUpdate(){
                console.log('B---componentDidUpdate');
            }

            render(){
                console.log('B---render');
                return(
                    <div>我是B组件，接收到的车是:{this.props.carName}</div>
                )
            }
        }
    ```
    1. 新版本
        1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
            1. constructor()
            2. getDerivedStateFromProps （新增的） 必须使用静态方法（即在前面加上static），必须有返回值返回值可以是state或null
            3. render()
            4. componentDidMount() =====> 常用 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
        2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
            1. getDerivedStateFromProps（新增的） 必须使用静态方法（即在前面加上static），必须有返回值返回值可以是state或null
            2. shouldComponentUpdate()
            3. render()
            4. getSnapshotBeforeUpdate（新增的） 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。
            5. componentDidUpdate()
        3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
            1. componentWillUnmount()  =====> 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
        ```jsx
             class Count extends React.Component {
                 //构造器
                 constructor(props) {
                 	console.log('Count---constructor');
                 	super(props);
                 	//初始化状态
                    this.state = { count: 0 };
                }
 
                //加1按钮的回调
                add = () => {
                    //获取原状态
                    const { count } = this.state;
                    //更新状态
                    this.setState({ count: count + 1 });
                };
 
                //卸载组件按钮的回调
                death = () => {
                    ReactDOM.unmountComponentAtNode(document.getElementById('test'));
                };
 
                //强制更新按钮的回调
                force = () => {
                    this.forceUpdate();
                };
 
                //若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
                static getDerivedStateFromProps(props, state) {
                    console.log('getDerivedStateFromProps', props, state);
                    return null;
                }
 
                //在更新之前获取快照
                getSnapshotBeforeUpdate() {
                    console.log('getSnapshotBeforeUpdate');
                    return 'atguigu';
                }
 
                //组件挂载完毕的钩子
                componentDidMount() {
                    console.log('Count---componentDidMount');
                }
 
                //组件将要卸载的钩子
                componentWillUnmount() {
                    console.log('Count---componentWillUnmount');
                }
 
                //控制组件更新的“阀门”
                shouldComponentUpdate() {
                    console.log('Count---shouldComponentUpdate');
                    return true;
                }
 
                //组件更新完毕的钩子
                componentDidUpdate(preProps, preState, snapshotValue) {
                    console.log('Count---componentDidUpdate', preProps, preState, snapshotValue);
                }
 
                render() {
                    console.log('Count---render');
                    const { count } = this.state;
                    return (
                        <div>
                            <h2>当前求和为：{ count }</h2>
                            <button onClick={ this.add }>点我+1</button>
                            <button onClick={ this.death }>卸载组件</button>
                            <button onClick={ this.force }>不更改任何状态中的数据，强制更新一下</button>
                        </div>
                    );
                }
            }
        ```

### 脚手架

```shell
npx create-react-app my-app
```

### 类型检查

使用PropTypes来进行类型检查

```javascript
//1. npm下载prop-types包  npm install --save prop-types
//2. 引入prop-types
import PropTypes from 'prop-types';

//3. 使用
class xxx extends React.Component {
	static propTypes = {
		comments: PropTypes.array.isRequired,
		delComment: PropTypes.func.isRequired
	}
}

```

### 组件通讯

1. 父传子

    - 父组件

      ```javascript
      class xxx extends React.Component {
          state = {
              comments: [
                  { username: 'jack', content: 'React真好玩' },
                  { username: 'rose', content: 'React真有意思' },
              ]
          }
          //删除指定评论（父组件执行）
          delComment = (index) => {
              const { comments } = this.state
              comments.splice(index, 1)
              this.setState({ comments })
          }
     
          render() {
              //解构赋值取到comments
              const { comments } = this.state
              const display = comments.length === 0 ? 'block' : 'none'
              return (
                  <div className="col-md-8">
                      <h3 className="reply">评论回复：</h3>
                      <h2 style={ { display } }>暂无评论，点击左侧添加评论！！！</h2>
                      <ul className="list-group">
                          {
                              //自定义属性值将comment，index和delComment方法调用传给子组件
                              comments.map(
                                  (comment, index) => <ComponentItem comment={ comment } key={ index } index={ index } delComment={ this.delComment }/>
                              )
                          }
                      </ul>
                  </div>
              )
          }
      }
      ```

    - 子组件

        ```jsx
        class xxx extends React.Component {
          //删除当前评论
          handleClick = () => {
              //解构赋值取到comment,index,delComment
              const {comment,index,delComment} = this.props
              //提示
              if(window.confirm(`确认删除${comment.username}的评论吗？`)){
                  //删除(调用父组件的方法)
                  delComment(index)
              }
          }
     
          render() {
              //解构赋值取到comment
              const {comment} = this.props
              return (
                  <li className="list-group-item">
                      <div className="handle">
                          <a onClick={this.handleClick}>删除</a>
                      </div>
                      <p className="user"><span>{comment.username}</span><span>说:</span></p>
                      <p className="centence">{comment.content}</p>
                  </li>
              )
          }
        }
         
         ```

2. PubSub（订阅）

    ```shell
      //npm下载pubsub-js包
      npm install --save pubsub-js
      //引入
      import PubSub from 'pubsub-js'
    ```

- 兄弟组件1

    ```javascript
        //通过publish发布消息
        PubSub.publish('search',searchName)
    ```

- 兄弟组件2

    ```javascript
    //通过subscribe订阅消息
    PubSub.subscribe('search', (msg,searchName) => {
        //发送请求xxxx
    })
    ```

3. redux
    1. npm 下载redux包和开发插件 redux-devtools-extension npm install --save redux redux-devtools-extension
    2. 新建四个文件夹
       ![](https://images.gitee.com/uploads/images/2020/0808/153915_c8c0ad97_1133983.png "TIM截图20200808153900.png")
        - store.js
       ```javascript
           /*
           * redux 核心管理模块
           * */
           import {applyMiddleware, createStore} from "redux";
           //异步
           import thunk from "redux-thunk";
           //开发插件
           import {composeWithDevTools} from "redux-devtools-extension";
           import reducers from "./reducers";
           export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
       ```
        - reducers.js
       ```javascript
           /*
           * 包含n个reducer函数，根据老的返回新的
           * */
           //通过combineReducers来拆分reducer
           import {combineReducers} from 'redux'
           import {
               AUTH_SUCCESS,
               ERROR_MSG,
               RESET_USER,
               RECEIVE_USER,
               RECEIVE_USER_LIST,
               RECEIVE_MSG,
               RECEIVE_MSG_LIST,
               MSG_READ
           } from './action-type'
           import {getRedirectTo} from "../utils";
           
           const initUser = {
               username:'',//用户名
               type:'',//用户类型dashen/laoban
               msg:'',//错误提示信息
               redirectTo:''//需要自动重定向的路由路径
           }
           //产生user状态的reducer
           function user(state=initUser,action) {
               switch (action.type) {
                   case AUTH_SUCCESS://data是user  action.data
                       const {type,header} = action.data
                       return {...action.data,redirectTo: getRedirectTo(type,header)}
                   case ERROR_MSG://data是msg
                       return {...state,msg:action.data}
                   case RECEIVE_USER://data是msg
                       return action.data
                   case RESET_USER://data是msg
                       return {...initUser,msg:action.data}
                   default:
                       return state
               }
           }
           export default combineReducers({
               user,
           })
       
       ```
        - action-type.js
       ```javascript
           /*
           * 包含n个action名称
           * */
           export const AUTH_SUCCESS = 'auth_success'//注册/登录成功
       ```
        - action.js
       ```javascript
           /*
           * 包含n个action
           * */
           import {
               AUTH_SUCCESS,
               ERROR_MSG,
               RECEIVE_USER,
               RESET_USER,
               RECEIVE_USER_LIST,
               RECEIVE_MSG_LIST,
               RECEIVE_MSG,
               MSG_READ
           } from './action-type'
           //引入api
           import {
               reqRegister,
               reqLogin,
               reqUpdateUser,
               reqUser,
               reqUserList,
               reqChatMsgList,
               reqReadMsg
           } from '../api'
           
           //授权成功的同步action
           const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
           //错误提示信息的同步action
           const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
           //注册异步action
           export const register = (user) => {
               const {username, password, password2, type} = user
               //表单验证
               if (!username) {
                   return errorMsg('用户名不能为空')
               }
               if (!password) {
                   return errorMsg('密码不能为空')
               }
               if (!password2) {
                   return errorMsg('确认密码不能为空')
               }
               if (password !== password2) {
                   return errorMsg('两次密码要一致')
               }
               return async dispatch => {
                   //发送注册的异步ajax请求
                   const response = await reqRegister({username, password, type})
                   const result = response.data
                   if (result.code === 0) {
                       // 分发成功的同步action
                       await getMsgList(dispatch,result.data._id)
                       dispatch(authSuccess(result.data))
                   } else {
                       // 分发错误提示信息的同步action
                       dispatch(errorMsg(result.msg))
                   }
               }
           }

       ```
    3. 使用
       ```javascript
           import {connect} from 'react-redux'
           import {login} from '../../redux/actions'//action中的方法
           export default connect(
             state => ({user: state.user}),//reducers中定义的reducer
             {login}//action中的方法
           )('当前组件名')
       ```
    4. 详情在redux_test_new文件夹中的readme

### 路由

1. 基本使用
    1. 下载包和引入包
    ```jsx
        npm install --save 'react-router-dom'
        import {HashRouter,Switch,Route} from 'react-router-dom'
    ```
    2. 明确好界面中的导航区、展示区
    3. 导航区的a标签改为Link标签
    ```jsx
        <Link to="/xxxxx">Demo</Link>    
    ```
    4. 展示区写Route标签进行路径的匹配
    ```jsx
        <Route path='/xxxx' component={Demo}/>  
    ```
    5. <App>的最外侧包裹了一个BrowserRouter或HashRouter
2. 路由组件与一般组件
    1. 写法不同： 一般组件：<Demo/>
       路由组件：<Route path="/demo" component={Demo}/>
    2. 存放位置不同： 一般组件：components 路由组件：pages
    3. 接收到的props不同：
        - 一般组件：写组件标签时传递了什么，就能收到什么
        - 路由组件：接收到三个固定的属性
            - history:
                - go: ƒ go(n)
                - goBack: ƒ goBack()
                - goForward: ƒ goForward()
                - push: ƒ push(path, state)
                - replace: ƒ replace(path, state)
            - location:
                - pathname: "/about"
                - search: ""
                - state: undefined
            - match:
                - params: {}
                - path: "/about"
                - url: "/about"
3. NavLink与封装NavLink
    1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
4. Switch的使用
    1. 通常情况下，path和component是一一对应的关系。
    2. Switch可以提高路由匹配效率(单一匹配)。
5. 解决多级路径刷新页面样式丢失的问题
    1. public/index.html 中 引入样式时不写 ./ 写 / （常用）
    2. public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
    3. 使用HashRouter
6. 路由的严格匹配与模糊匹配
    1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
    2. 开启严格匹配：<Route exact={true} path="/about" component={About}/>
    3. 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由
7. Redirect的使用
    1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
    2. 具体编码：
    ```jsx
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/home" component={Home}/>
                <Redirect to="/about"/>
            </Switch>
    ```
8. 嵌套路由
    1. 注册子路由时要写上父路由的path值
    2. 路由的匹配是按照注册路由的顺序进行的
9. 向路由组件传递参数
    1. params参数

    - 路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
    - 注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
    - 接收参数：this.props.match.params

    2. search参数

    - 路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
    - 注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
    - 接收参数：this.props.location.search
    - 备注：获取到的search是urlencoded编码字符串，需要借助querystring解析

    3. state参数
        - 路由链接(携带参数)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
        - 注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
        - 接收参数：this.props.location.state
        - 备注：刷新也可以保留住参数
10. 编程式路由导航 借助this.prosp.history对象上的API对操作路由跳转、前进、后退 -this.prosp.history.push()
    -this.prosp.history.replace()
    -this.prosp.history.goBack()
    -this.prosp.history.goForward()
    -this.prosp.history.go()
11. BrowserRouter与HashRouter的区别
    1. 底层原理不一样：
        - BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
        - HashRouter使用的是URL的哈希值。
    2. path表现形式不一样
        - BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
        - HashRouter的路径包含#,例如：localhost:3000/#/demo/test
    3. 刷新后对路由state参数的影响
        - (1).BrowserRouter没有任何影响，因为state保存在history对象中。
        - (2).HashRouter刷新后会导致路由state参数的丢失！！！
    4. 备注：HashRouter可以用于解决一些路径错误相关的问题。

### setState

- 写法 setState(stateChange,[callback])
    1. 函数：this.setState(state => ({count:state.count + 1})
    2. 对象：this.setState({count:this.state.count + 1})
    3. callback回调函数可选，如果需要在setState后获取最新的状态数据，在callback函数中读取
    4. 对象方式是函数方式的简写方式，如果新状态不依赖原状态，使用对象方式，如果依赖，使用函数方式
- 异步还是同步
    1. react相关回调（生命周期/react事件回调）：异步
    2. 其他异步回调（定时器回调/原生事件监听回调/promise回调）：同步
- 多次调用
    1. 对象方式：合并更新一次状态，只调用一次render()更新界面 ---状态更新和界面更新都合并了
    2. 函数方式：更新多次状态，但只调用一次render()更新界面 ---状态更新没有合并，但界面更新合并了

### Component

- 存在的问题：
    1. 父组件重新render(),当前组件也会重新执行render()，即使没有任何变化
    2. 当前组件setState()，重新执行render(),即使state没有任何变化
- 解决
    1. 原因：组件的componentShouldUpdate()默认返回true，即使数据没有变化render()都会重新执行
    2. 方法一：重写shouldComponentUpdate()，判断如果数据有变化返回true，否则返回false
    3. 办法二：使用PureComponent代替Component React.Component ===>  React.PureComponent
    4. 说明：一般都使用PureComponent来优化组件性能
- PureComponent的基本原理
    1. 重写shouldComponentUpdate()
    2. 对组件的新/旧state和props中的数据进行浅比较（, 如果只是数据对象内部数据变了, 返回false  
       不要直接修改state数据, 而是要产生新数据），如果都没有变化就返回false，否则就返回true
    3. 一旦componentShouldUpdate()返回false，不再执行用于更新的render()
  

### 路由组件的lazyLoad
```jsx
//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
const Login = lazy(()=>import('@/pages/Login'))

//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
<Suspense fallback={<h1>loading.....</h1>}>
    <Switch>
        <Route path="/xxx" component={Xxxx}/>
        <Redirect to="/login"/>
    </Switch>
</Suspense>
```
### antd

1. 下载包
   ```shell
   //npm
   npm install antd --save
   //yarn
   yarn add antd
   ```
2. 引入
   ```jsx
   import { DatePicker } from 'antd';

   ReactDOM.render(<DatePicker />, mountNode);
   ```
3. 按需加载和自定义主题
    - 方法一

        1. 下载依赖模块
           ```
               //npm
               npm install --save react-app-rewired customize-cra babel-plugin-import
               //yarn
               yarn add react-app-rewired customize-cra babel-plugin-import
           ```
        2. 根目录下创建config-overrides.js文件
           ```javascript
               const {override, fixBabelImports} = require('customize-cra');
               module.exports = override(
                   fixBabelImports('import', {
                   libraryName: 'antd',
                   libraryDirectory: 'es',
                   style: 'css',
                   }),
               );
           ```
        3. 修改配置文件 package.json
           ```json
               "scripts": {
                   "start": "react-app-rewired start",
                   "build": "react-app-rewired build",
                   "test": "react-app-rewired test",
                   "eject": "react-scripts eject"
               }
           ```
        4. 自定义主题
            1. 下载依赖包
               ```
                   //npm
                   npm install less less-loader@5.0.0 --save
                   //yarn
                   yarn add less less-loader
               ```
            2. 修改config-overrides.js
               ```javascript
                   const {override, fixBabelImports, addLessLoader} = require('customize-cra');
                   module.exports = override(
                       fixBabelImports('import', {
                           libraryName: 'antd',
                           libraryDirectory: 'es',
                           style: true,
                       }),
                       addLessLoader({
                           javascriptEnabled: true,
                           modifyVars: {'@primary-color': '#1DA57A'},//主题色
                       }),
                   );
               ```
    - 方法二（文档 https://github.com/DocSpring/craco-antd）
        1. 下载craco和craco-antd（包括了less、babel-plugin-import和自定义主题的方法）
           ```
               //npm
               npm i -S @craco/craco craco-antd
               //yarn
               yarn add @craco/craco craco-antd
           ```
        2. 根目录下创建craco.config.js文件
           ```javascript
               const CracoLessPlugin = require('craco-antd');
               module.exports = {
                   plugins: [
                       {
                           plugin: CracoLessPlugin,
                           options: {
                               customizeTheme: {//这里可以直接自定义主题色
                                   "@primary-color": "#1DA57A",
                                   "@link-color": "#1DA57A"
                               },
                               //customizeThemeLessPath: path.join(//也可以创建一个less文件，将需要改变的变量写入
                               //	__dirname,
                               //	"src/style/AntDesign/customTheme.less"
                               //)
                           },
                       },
                   ],
               };
           ```


4. 3x迁移4x
    1. 表单中，向父组件暴露form表单对象的方法（不看官方文档。。不看迁移的后果！！！！）
        - 3x
          ```
              使用Form.create()创建上下文 eg：export default Form.create()(组件名)
              使用this.props.form就能获取到表单组件
              父组件上setForm={(form)=>this.form=form}
              组件初始化时调用this.props.setForm(this.props.form)
              这样在父组件中就可以使用this.form来使用form的属性和方法了
          ```
        - 4x
          ```
              与3x不同，4x废弃了Form.create()，这样就不能直接使用this.props.form了，
              但是可以使用在组件上使用ref
                  eg:<Form ref={this.formRef}></Form>
              使用React.createRef()来获取form的实体
                  formRef = React.createRef();
              后面操作与3x类似只是this.props.form换成了this.formRef
          ```

### 高阶函数、高阶组件和函数柯里化

- 高阶函数
    1. 一类特别的函数
        1. 接受函数类型的参数
        2. 返回值是函数
    2. 常见
        1. 定时器：setTimeout()/setInterval()
        2. Promise：Promise(() => {}) then(value=>{},reason=>{})
        3. 数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
        4. 函数对象的bind()
        5. Form.create()()/getFieldDecorator()()   //antd中被弃用 3。高阶函数更新动态，更加具有扩展性
- 高阶组件
    1. 本质是一个函数
    2. 接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
    3. 作用：扩展组件的功能
    4. 高阶组件也是高阶函数：接收一个组件函数，返回时一个新的组件函数
- 函数柯里化
    1. 通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式
        ```jsx
        class xxx extends React.Component {
            state = {
                username:'',
                password:''
            }
            
            changeData = (dataType) => {
                return (event) => {
                    this.setState({[dataType]:event.target.value})
                }
            }
                        
            handleSubmit = () => {
                console.log(`你输入的用户名是${username}，密码是${password}`);
            }
        
            render() {
                return(
                    <from onSubmit={this.handleSubmit}>
                        用户名：<input type="text" onChange={this.changeData('username')} name="username"/><br>
                        密码：<input type="text" onChange={this.changeData('password')} name="password"/>
                    </from>
            )
        }                   
        ```

### Hooks

- 简介 允许不适用class的情况下使用state以及其他的react特性
- 引入方法
    ```jsx
        import react,{useState,useEffect,useRef} from 'react
    ```
- useState 
  1. State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
  2. 语法: const [xxx, setXxx] = React.useState(initValue)  
  3. useState()说明:
     - 参数: 第一次初始化指定的值在内部作缓存
     - 返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
  4. setXxx()2种写法:
     - setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
     - setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
- useEffect
  1. Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
  2. React中的副作用操作:
     - 发ajax请求数据获取
     - 设置订阅 / 启动定时器
     - 手动更改真实DOM
  3. 语法和说明:
     ```jsx
     useEffect(() => {
       // 在此可以执行任何带副作用操作
       return () => { // 在组件卸载前执行
         // 在此做一些收尾工作, 比如清除定时器/取消订阅等
       }
     }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行  
     ```
  4. 可以把 useEffect Hook 看做如下三个函数的组合
       - componentDidMount()
       - componentDidUpdate()
- useRef
  1. Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
  2. 语法: const refContainer = useRef()
  3. 作用:保存标签对象,功能与React.createRef()一样

- react-redux

    1. react-redux 中提供了 useStore(),useSelector(),useDispatch() 三种钩子，不推荐使用useStore()

    2. 比较

        1. class模式

           ```jsx
           // 需要使用高阶函数包裹 才能调用react-redux中的state和方法
           export default connect(
               state=>({comments:state.comments}),//state就是一个comments数组
               {addComment,delComment,getComments}
           )(App)
           ```

        2. 函数模式

           ```javascript
           //直接使用方法引入，调用 useSelector 和 useDispatch 实现对react-redux中的state获取与修改
           import {useDispatch, useSelector} from "react-redux";
           ```

    3. useSelector

       ```jsx
       import {useSelector} from "react-redux";
       // useSelector(state => state.xxx)
       const comments = useSelector(state=>state.comments)
       ```


4. useDispatch

   ```javascript
   import {useDispatch} from "react-redux";
   const dispatch = useDispatch()
   dispatch(xxx) //xxx可为action中的方法
   ```

### Context
1. 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信
2. 创建Context容器对象：const XxxContext = React.createContext()
3. 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider> 
4. 后代组件读取数据：
```js
	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```
5. 注意：在应用开发中一般不用context, 一般都它的封装react插件


###  render props

#### 1. 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构, 一般用render函数属性

#### 2. children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

#### 3. render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 


### 错误边界

1. 理解：
    错误边界：用来捕获后代组件错误，渲染出备用页面
2. 特点：
    只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
3. 使用方式：
    getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

### 组件通信方式总结

1. 方式：
    1. props：
       - children props
       - render props
    2. 消息订阅-发布：
        pubs-sub、event等等
    3. 集中式管理：
        redux、dva等等
    4. conText:
        生产者-消费者模式

2. 组件间的关系
   - 父子组件：props
   - 兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
   - 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)


### key的作用

1. 虚拟DOM中key的作用：
    1. 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

    2. 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

        1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
            1. 若虚拟DOM中内容没变, 直接使用之前的真实DOM
            2. 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

        2. 旧虚拟DOM中未找到与新虚拟DOM相同的key，根据数据创建新的真实DOM，随后渲染到到页面

2. 用index作为key可能会引发的问题：
    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作: 会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

    2. 如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。

    3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

3. 开发中如何选择key?:
   1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。 2.如果确定只是简单的展示数据，用index也是可以的。
     



