# React-Redux
[⬅ Go Back](../week4.md)

## Notes
- `Provider` takes care of `subscribe` and `unsubscribe`


### Demo

- index.js
  ```Javascript
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { Provider, connect } from 'react-redux'
  import store, { increment } from './store'

  const Counter = (props) => {
    const count = props.count;
    const increment = props.increment;

    return (
      <div id='container'>
        <div id='counter'>
          <h1>{count}</h1>
          <button onClick={increment}>Increment</button>
        </div>
      </div>
    )
  }

  // return props object
  const mapStateToProps = (state) => {
    return {
      // count = props.count ; state.count comes from store.js
      count: state.count
    }
  }
  // props now has a count prop (props.state)

  // combines with mapStateToProps object to make a props object
  const mapDispatchToProps = (dispatch) => {
    return {
      // follow this syntax!!
      // increment in dispatch is imported from store.js
      // calls dispatch on action
      increment: () => dispatch(increment())
    }
  }

  const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>,
    document.getElementById('app')
  );
  ```
  - `Provider` takes in a parameter - `store`
  - Everything is going to be `props` now that we are using React-Redux!
    - `props` are coming from the `store` passed into `Provider`
  - `connect` makes sure everything in Redux `store` goes into `props`

  <br>

- store.js
  ```Javascript
  import { createStore, applyMiddleware } from 'redux'
  import reduxLogger from 'redux-logger'

  // Type constants
  const INCREMENT = 'INCREMENT';

  // Action creators
  export const increment = () => {
    return {
      type: INCREMENT
    }
  }

  // Reducer
  const initialState = {
    count: 0
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT:
        return {
          count: state.count + 1
        }
      default:
        return state;
    }
  }

  const store = createStore(reducer, applyMiddleware(reduxLogger))
  ```
  - Type constants are not required but it is easier to catch typos and it's "cleaner code"
    - Omitting the type constant will not change the code! 
    ```Javascript
    export const increment = () => {
      return {
        type: 'INCREMENT'
      }
    }
    ```
#### Recap
- `import { connect } from 'react-redux'`
- Reducer uses switch cases. Each case needs a `type`
  - Type constant optional but recommended
- Connect state and actions to props using `mapStateToProps` and `mapDispatchToProps`
  - `mapStateToProps` and `mapDispatchToProps` adds state and actions to props
  - Use this syntax for `mapStateToProps`
    ```Javascript
    const mapStateToProps = (state) => {
      return {}
    }
    ```
  - Use this syntax for `mapDispatchToProps`
    ```Javascript
    const mapDispatchToProps = (dispatch) => {
      return {
        increment: () => dispatch(ActionCreatorName())
      }
    }
    ```
  - `connect`
    ```Javascript
    const Connected = connect(mapStateToProps, mapDispatchToProps)(ComponentName)

    ReactDOM.render(
      <Provider store={store}>
        <Connected />
      </Provider>,
      document.getElementById('app')
    );