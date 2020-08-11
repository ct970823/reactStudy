# react学习

### 创建虚拟dom
1. 普通方式

```
<script type="text/javascript">
        const msg = 'I Like You!'
        const myId = 'testId'
        // 创建虚拟DOM 标签，标签属性 标签内容
        const vDom = React.createElement('h2',{id:myId.toLowerCase()},msg.toUpperCase())
        // 渲染虚拟DOM
        ReactDOM.render(vDom,document.getElementById('test1'))
</script>
```
2. JSX方式（注意：type是text/babel 因为需要babel来解析jsx）

```
<script type="text/babel">
        const vDom2 = <h1 id={myId.toUpperCase()}>{msg.toLowerCase()}</h1>
        ReactDOM.render(vDom2,document.getElementById('test2'))
</script>
```
### 自定义组件
1. 工厂函数组件（简单组件）

```
function MyComponent () {
        return <h2>工厂函数组件(简单组件)</h2>
}
ReactDOM.render(<MyComponent />,document.getElementById('example1'))
```
2. ES6类组件（复杂组件）

```
class MyComponent2 extends React.Component{
        render(){
            return <h2> ES6类组件（复杂组件）</h2>
        }
}
ReactDOM.render(<MyComponent2 />,document.getElementById('example2'))
```
### input取值和方法回调
```
//如果是class
//constructor(props) {
//    super(props);
//    //需要为函数绑定this，这样才能使用this
//    this.showInput = this.showInput.bind(this)
//}
//也可以使用箭头函数，这样就自动绑定this
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
### state状态
1. 放在constructor中

```
constructor(props) {
    super(props);
    //初始化状态
    this.state = {
        pwd:''
    }
}
```
2. 直接写在class中

```
state = {
    pwd:''
}
```
### 生命周期

```
//组件将加载
componentWillMount () {}
//组件加载
componentDidMount () {}
//组件将更新
componentWillUpdate () {}
//组件更新
componentDidUpdate () {}
//组件将要移除
componentWillUnmount () {}
//卸载组件
distroyComponent () {}
```
### 脚手架

```
npx create-react-app my-app
```

### 类型检查
使用PropTypes来进行类型检查

```
//1. npm下载prop-types包  npm install --save prop-types
//2. 引入prop-types
import PropTypes from 'prop-types';
//3. 使用
static propTypes = {
    comments:PropTypes.array.isRequired,
    delComment:PropTypes.func.isRequired
}
```


### 组件通讯
1. 父传子
- 父组件

```
state = {
        comments:[
            {username:'jack',content:'React真好玩'},
            {username:'rose',content:'React真有意思'},
        ]
    }
//删除指定评论（父组件执行）
    delComment = (index) => {
        const {comments} = this.state
        comments.splice(index,1)
        this.setState({comments})
    }
render() {
        //解构赋值取到comments
        const { comments} = this.state
        const display = comments.length === 0 ? 'block' : 'none'
        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                <h2 style={{display}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {
                        //自定义属性值将comment，index和delComment方法调用传给子组件
                        comments.map((comment,index) => <ComponentItem comment={comment} key={index} index={index} delComment={this.delComment}/>)
                    }
                </ul>
            </div>
        )
}
```
- 子组件

```
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

```

2. PubSub（订阅）
```
//npm下载pubsub-js包
npm install --save pubsub-js
//引入
import PubSub from 'pubsub-js'
```
- 兄弟组件1
```
//通过publish发布消息
 PubSub.publish('search',searchName)
```
- 兄弟组件2

```
//通过subscribe订阅消息
PubSub.subscribe('search', (msg,searchName) => {
    //发送请求xxxx
})
```
3. redux
    1. npm 下载redux包和开发插件 redux-devtools-extension
    npm install --save redux redux-devtools-extension
    2. 新建四个文件夹
		![](https://images.gitee.com/uploads/images/2020/0808/153915_c8c0ad97_1133983.png "TIM截图20200808153900.png")
		- store.js
		```
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
		```
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
		```
			/*
			* 包含n个action名称
			* */
			export const AUTH_SUCCESS = 'auth_success'//注册/登录成功
		```
		- action.js
		```
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
		```
			import {connect} from 'react-redux'
			import {login} from '../../redux/actions'//action中的方法
			export default connect(
			  state => ({user: state.user}),//reducers中定义的reducer
			  {login}//action中的方法
			)('当前组件名')
		```
### 路由
1. 下载包和引入包

```
npm install --save 'react-router-dom'
import {HashRouter,Switch,Route} from 'react-router-dom'
```
2. 使用

```
/*
HashRouter:hashHistory 使用 URL 中的 hash（#）部分去创建路由 简单来说就是url地址中会出现#,例如http://xxxx.com/#/
Switch：表示只显示一个路由组件
Route：参数path和component path为路由地址 component为组件名
*/
<HashRouter>
    <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        {/*默认路由*/}
        <Route component={Main} />
    </Switch>
</HashRouter>
```

### antd
1. 下载包
```
//npm
npm install antd --save
//yarn
yarn add antd
```
2. 引入
```
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
			```
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
			```
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
				```
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
			```
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
### 高阶函数和高阶组件
	- 高阶函数
		1. 一类特别的函数
			1. 接受函数类型的参数
			2. 返回值是函数
		2. 常见
			1. 定时器：setTimeout()/setInterval()
			2. Promise：Promise(() => {}) then(value=>{},reason=>{})
			3. 数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
			4. 函数对象的bind()
			5. Form.create()()/getFieldDecorator()()   //antd中被弃用
		3。高阶函数更新动态，更加具有扩展性
	- 高阶组件
		1. 本质是一个函数
		2. 接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
		3. 作用：扩展组件的功能 
		4. 高阶组件也是高阶函数：接收一个组件函数，返回时一个新的组件函数












