import React from 'react'
import * as actions from '../redux/actions'
class App extends React.Component {
    state = {
        count:0
    }

    increment = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.调用store的方法更新状态
        // this.props.store.dispatch({type: INCREMENT, data: number})
        //使用actions
        this.props.store.dispatch(actions.increment(number))
    }

    decrement = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.调用store的方法更新状态
        // this.props.store.dispatch({type:DECREMENT,data:number})
        //使用actions
        this.props.store.dispatch(actions.decrement(number))
    }

    incrementIfOdd = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.得到原本的count状态
        const count = this.props.store.getState()
        if(count%2===1){
            // 3.调用store的方法更新状态
            // this.props.store.dispatch({type: INCREMENT, data: number})
            //使用actions
            this.props.store.dispatch(actions.increment(number))
        }
    }

    incrementAsync = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        setTimeout(()=>{
            // 3.调用store的方法更新状态
            // this.props.store.dispatch({type: INCREMENT, data: number})
            //使用actions
            this.props.store.dispatch(actions.increment(number))
        },1000)

    }

    render() {
        //得到redux状态
        console.log(this.props.store)
        const count  = this.props.store.getState()
        return (
            <div>
                <p>click {count} times</p>
                <div>
                    <select ref={select => this.select = select}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        )
    }
}

export default App