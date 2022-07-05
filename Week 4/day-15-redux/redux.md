# Redux
[⬅ Go Back](../week4.md)

## Notes

### Principles
  - Single source of truth
  - Data is read-only
  - Changes are requested through actions

### `State`
  - Data that can actively change and causes a view change for the user
  - Redux moves the state to a different/more accessible location!

#### The `Store`
  - Single holder of information
  - Read-only
  
#### Actions
  - Store can receive dispatched signals (actions) meant to affect state
  - "Things that happen in your app that affect state"
  - Dispatching an action triggers the `reducer` to produce a new state

#### Reducers
  - Decides what the new state should be

#### Flow
  1. Click button (event) which leads to Action
  2. Action is sent to Dispatcher in Store
  3. Dispatcher sends Action to Reducer in Store
  4. State comes out of Reducer
  5. State is updated 

......

  1. Store contains a reducer that holds the application state
  2. When actions get dispatched, the store runs the reducer to update the state
  3. If the state gets updated, the store notifies all subscribers


## Demo
- Make a separate `redux` folder with `index.js` in it in `src`
  - src/redux/index.js
- Import `Redux` through `npm install redux`
- createStore - allows us to build up `store`
  ```Javascript
  import { createStore } from 'redux'
  ```
- `createStore` takes a `reducer` that takes in an `state` and `action`
- `createStore` returns an updated state

  ```Javascript
  const initialState = { count: 0 }
  const store = createStore(function reducer( state=initialState, action ) {
    return state
  })

  export default store;
  ```
- **subscribe()** is a listener that waits for updates to the STATE of the store. On changes runs the callback function

- **getState()** returns the STATE object in the redux store

- **dispatch()** sends an ACTION to the reducer. The ACTION is an object with a "type" and sometimes a value
  ```Javascript
  const initialState = { count: 0 }
  const store = createStore((state = initialState, action) => {
    if (action.type === 'add5') {
      state.count += action.amount
    }
  })
  ```

Vanilla JS:
```Javascript
const favNumElement = document.getElementById('favNum')

store.subscribe(() => {
  console.log('The store has changed')
  favNumElement.innerText = store.getState().count
})
```

## Lab

![redux-bank](/images/redux-bank.png)

```Javascript
// createStore is crossed out because configureStore has become available from redux tool kit and has become recommended recently
import { createStore } from 'redux';

const balance = document.getElementById("balance");
const deposit5 = document.getElementById("deposit5");
const deposit25 = document.getElementById("deposit25");
const withdraw5 = document.getElementById("withdraw5");
const withdraw25 = document.getElementById("withdraw25");

// onclick is lowercased AKA not using React

deposit5.onclick = () => store.dispatch({type: "deposit", amount: 5});
deposit25.onclick = () => store.dispatch({type: "deposit", amount: 25});
withdraw5.onclick = () => store.dispatch({type: "withdraw", amount: 5});
withdraw25.onclick = () => store.dispatch({type: "withdraw", amount: 25});

const reducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case "deposit":
      return { balance: state.balance + action.amount }
    case "withdraw": 
      return { balance: state.balance - action.amount }
    default: 
      return state;
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log('The store state has changed. Here is the new state:', store.getState())
  balance.innerHTML = store.getState().balance
})
```
To get the balance to update in the DOM:

![react-dom](/images/redux-bank-dom.png)
```Javascript
store.subscribe(() => {
  console.log('The store state has changed. Here is the new state:', store.getState())
  balance.innerHTML = `$${store.getState().balance}`
})
```