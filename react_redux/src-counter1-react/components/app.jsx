import React from 'react'

class App extends React.Component {
    state = {
        count:0
    }

    increment = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.得到原本的count状态，并计算新的count
        const count = this.state.count + number
        // 3.更新状态
        this.setState({count})
    }

    decrement = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.得到原本的count状态，并计算新的count
        const count = this.state.count - number
        // 3.更新状态
        this.setState({count})
    }

    incrementIfOdd = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.得到原本的count状态
        const count = this.state.count
        if(count%2===1){
            // 3.更新状态
            this.setState({count:count+number})
        }
    }

    incrementAsync = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.得到原本的count状态
        const count = this.state.count
        setTimeout(()=>{
            // 3.更新状态
            this.setState({count:count+number})
        },1000)

    }

    render() {
        const {count}  = this.state
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