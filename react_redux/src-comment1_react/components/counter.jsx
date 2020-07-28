import React from 'react'
import PropTypes from 'prop-types'
export default class Counter extends React.Component {
    static propTypes = {
        count:PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired,
        decrement:PropTypes.func.isRequired,
        incrementAsync:PropTypes.func.isRequired
    }

    increment = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        //使用react-redux使用方式
        this.props.increment(number)
    }

    decrement = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        //使用react-redux使用方式
        this.props.decrement(number)
    }

    incrementIfOdd = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        // 2.得到原本的count状态
        // const count = this.props.store.getState()
        const count = this.props.count
        if(count%2===1){
            // 3.调用store的方法更新状态
            //使用react-redux使用方式
            this.props.increment(number)
        }
    }

    incrementAsync = () => {
        // 1.得到增加的数量
        const number = this.select.value*1
        this.props.incrementAsync(number)

    }

    render() {
        //得到redux状态
        const count = this.props.count
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

