# React-Redux
[⬅ Go Back](../week4.md)

## Notes
- `Provider` takes care of `subscribe` and `unsubscribe`
  - Because of the provider you will always have access to the store
  - Whatever lives inside the provider has access to the store as well as any child of the component being wrapped by provider

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

  // combined object with mapStateToProps and mapDispatchToProps
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
      - There are two different ways to write [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch)
  - `connect`
    ```Javascript
    const Connected = connect(mapStateToProps, mapDispatchToProps)(ComponentName)

    ReactDOM.render(
      <Provider store={store}>
        <Connected />
      </Provider>,
      document.getElementById('app')
    );
    ```
      - The `connect` function wrapped our component in another component ('ConnectWrapperComponent'), which makes a call to `store.subscribe` so that it is registered to the store
        - `connect` has access to `store` because we gave the store to the `Provider`
        - 'ConnectWrapperComponent' listens for change and causes our component to re-render
      - 'ConnectWrapperComponent' decides what props to send using `mapStateToProps` and `mapDispatchToProps`
        - It takes the two objects they return, merges them together, and sends them all down as `props` to our component


## Resources:

#### [🔗 **Redux from Scratch Part 1**](https://gist.github.com/tmkelly28/5ac689b8de9b0da0bda2e2a377322c46)
#### [🔗 **Redux from Scratch Part 2**](https://gist.github.com/tmkelly28/db4e9f1aca0971378faed2ce95cb6c89)
#### [🔗 **Redux from Scratch Part 3**](https://gist.github.com/tmkelly28/7a38351a142f2bbe8d791b3239c96623)
#### [🔗 **Redux from Scratch Part 4**](https://gist.github.com/tmkelly28/0518885e20c300c3609c6591f2913368)
#### [🔗 **Redux from Scratch Part 5**](https://gist.github.com/tmkelly28/d2f20b42272ac780de31ea6a734ef8c3)
#### [🔗 **Redux from Scratch Part 6**](https://gist.github.com/tmkelly28/746a65cd145c7c8a7ff5b45defda49e2)