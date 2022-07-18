# React-Redux
[⬅ Go Back](/week4.md)

## Notes
- `npm i react-redux`
- Everything in `Provider` has access to Redux `store`
  - `Provider` replaces `import store from '../store'` in every single page
    - Only have to do it once in the `index.js`

```Javascript
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './componenets/App'
import { Provider } from react-redux
import store from './store'

createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```
- **No longer have a `store` variable**
  - `subscribe` and `unsubscribe` has to be done differently now!
  - `connect`

```Javascript
import React from 'react'
import { connect } from react-redux
```

- Before exporting -> run through connect function
- **`connect()`** takes two optional arguments (mapStateToProps, mapDispatchToProps)
  - **mapStateToProps()** -> returns the part of redux state the component cares about as an object
    - Takes the value and becomes a propr for actual component

    ```Javascript
    const mapStateToProps = (reduxState) => {
      return {
        a: 42,
        todos: state.todos,
        filter: state.visibilityFilter,
      }
    }

    // component will receive: props.a, props.todos, and props.filter
    ```

    ```Javascript
    import React from 'react'
    import { connect } from 'react-redux'

    function Balance(props) {
      return <h1>Balance: {props.balance}</h1>
    }

    const mapStateToProps = (reduxState) => {
      return {
        balance: reduxState.balance
      }
    }

    let connectedFunction = connect(mapStateToProps)
    export default connectedFunction(Balance)
    ```
  - **mapDispatchToProps()** - dispatch actions to the store
    ```Javascript
    function ButtonList(props) {
      return (
        <div className='btns'>
          <button onClick={() => props.deposit(5)}>Deposit 5</button>
          <button onClick={() => props.deposit(10)}>Deposit 10</button>
          <button onClick={() => props.withdraw(5)}>Withdraw 5</button>
          <button onClick={() => props.withdraw(10)}>Withdraw 10</button>
        </div>
      )
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        deposit5: () => dispatch({ type: 'deposit', amount: 5 })
      }
    }
    connect(null, mapDispatchToProps)(ButtonList)
    ```
    - Keeps your code DRY!
    ```Javascript
    const mapDispatchToProps = (dispatch) => {
      return {
        deposit: (amount) => dispatch({ type: 'deposit', amount }),
        withdraw: (amount) => dispatch({ type: 'withdraw', amount })
      }
    }
    ```

### Breaking up Redux


## ES7 React, Redux Snippets
- `rfcredux` - functional component with redux
  ```Javascript
  import React, { Component } from 'react'
  import { connect } from 'react-redux'

  export const FileName = () => {
    return <div>$4</div>
  }

  const mapStateToProps = (state) => ({})

  const mapDispatchToProps = {}

  export default connect(mapStateToProps, mapDispatchToProps)(FileName)
  ```
- `rcredux` - class component with redux
  ```Javascript
  import React, { Component } from 'react'
  import { connect } from 'react-redux'

  export class FileName extends Component {
    render() {
      return <div>$4</div>
    }
  }

  const mapStateToProps = (state) => ({})

  const mapDispatchToProps = {}

  export default connect(mapStateToProps, mapDispatchToProps)(FileName)
  ```

## Resources:

#### [🔗 **React-Redux mapStateToProps**](https://react-redux.js.org/using-react-redux/connect-mapstate)
#### [🔗 **React-Redux mapDispatchToProps**](https://react-redux.js.org/using-react-redux/connect-mapdispatch)
#### [🔗 **ES7 React, Redux Snippets Documentation**](https://github.com/dsznajder/vscode-react-javascript-snippets/blob/master/docs/Snippets.md)