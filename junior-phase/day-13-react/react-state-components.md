# State and Components
[⬅ Go Back](/week3.md)

- A Javascript library for building user interfaces

PROBLEM: Making a user interface is difficult! \
ANSWER: React

## Notes
- Dependencies - are for the app
- Dev Dependencies - to help the app run 

```
import React from 'react'
import ReactDOM from 'react-dom'
```

### State
- **State** - every user interface has data and presents something based on that data (state is data that changes)
    - This should be reflected in the view!
- When you update "state", React re-renders the view for you
    - The re-rendered view is in a performant way (just updates the part that is different)
- We do not directly mutate "state" (like variable manipulation)
    - `state.showStatus = 'all'`
- We set the status by using its updater function
    - `this.setState({showStatus: 'all'})`

### Components
- Each component can have multiple methods but **only** one render function

Super basic outline
```Javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {
    // initial setup
    constructor() {
        super()

    }
    // methods
    render() {
        // the return of render is the JSX that this component outputs
        return <h1>This is the main component</h1>
    }
}

// put class as its own self-closing tag
ReactDOM.render(<Counter/>, document.getElementById('app'))
```
- To put Javascript inside HTML in React, we need to use `{ }`
    - Same as `${ }`
    ```Javascript
    <h1>{this.state.count}</h1>
    ```

- Methods do not need to have the keyword function because it is in a class
    ```Javascript
        increment () {
        this.setState({
            count: this.state.count + 1
            // CANNOT use this.state.count++
            // ++this.state.count works but not recommended
            // If you have to use setState({ count: something }) then using state.count++ won’t change the state.  
            // ++ becomes += 1 but we’re changing state a different way: 
            // the setState method, so += anything (or +) will be ignored
            // Putting ++ before something increments and then returns it:
        })
    }
    ```

- Buttons
    - **Do not** need to `getElementById('')` and `addEventListener`
    ```Javascript
    <button onClick={this.increment}>Increment</button>
    ```

- Bind
    - Bind the `this` context of "increment" to be the context of the component in the constructor:
    ```Javascript
        constructor() {
            super()
            this.state = {
                count: 0
            }
            // need to bind "this" context to be the context of the component in the constructor
            this.increment = this.increment.bind(this)
    }
    ```

Increment Button (Component)
```Javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {
    constructor() {
        super()
        this.state = { count: 0}
        this.increment = this.increment.bind(this)
        this.reset = this.reset.bind(this)
    }
    // methods
    increment () {
        this.setState({ count: this.state.count + 1 })
    }
    reset() {
        this.setState({ count: 0 })
    }
    render() {
        return (
            <div id='container'>
                <div id='navbar'>
                    Counter.js
                </div>
                <div id='counter'>
                    <h1>{this.state.count}</h1>
                    <button onClick={this.increment}>Increment</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Counter/>, document.getElementById('app'))
```