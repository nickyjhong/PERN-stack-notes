# `combineReducers`
[⬅ Go Back](/week4.md)

## Notes
- `combineReducers` does exactly what it sounds like - it combines reducers
- The resulting reducer (usually called `rootReducer`) calls every child reducer and gathers their results into a single state object
- This is done to help break up code into smaller parts!
- `combineReducers` takes an object as an argument
  - Convention is to name reducers after the state slices they manage
    ```Javascript
    combineReducers({counter, todos})

    // instead of:
    combineReducers({
      counter: counter,
      todos: todos
    })
    ```

<br>

### Example
```Javascript
// reducers/todos.js
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default: 
      return state
  }
}
```

```Javascript
// reducers/counter.js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
```

```Javascript
// reducers/index.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})
```

```Javascript
// App.js
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
```