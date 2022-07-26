import React, { Component } from 'react'
import { ThemeContext } from './App'

export default class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: props.initialCount
        }
    }
    changeCount(num) {
        this.setState(prevState => {
            return {count: this.state.count + num}
        }
    )}
    render() {
        return (
            <ThemeContext.Consumer>
                {(style => (
                    <div>
                        <button style={style} onClick={() => this.changeCount(-1)}>-</button>
                        <span>{this.state.count}</span>
                        <button style={style} onClick={() => this.changeCount(+1)}>+</button>
                    </div>  
                ))}

            </ThemeContext.Consumer>

        )
    }
}