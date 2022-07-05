# Redux
[⬅ Go Back](../week4.md)

- Redux is a "predictable state container for JavaScript apps" - helps ensure apps work predictably
- A state management framework that can be used with different technologies, including React!

## Notes

### Store
- The entire state of your app can be defined by a single state object housed in the Redux `store`
- Any time any piece of your app wants to update state, it **must** do it through the Redux store
- **`Redux.createStore()`** takes in a `reducer` function as a required argument
  ```Javascript
  const reducer = (state = 5) => {
    return state;
  }

  // Redux methods are available from a Redux object
  // For example: Redux.createStore()

  const store = Redux.createStore(reducer)
  ```
- **`store.getState()`** retrieves the current `state`
  ```Javascript
  const store = Redux.createStore(
    (state = 5) => state
  );

  let currentState = store.getState()
  ```
### Action
- An action is a JavaScript object that contains information about an action event that has occured
- Redux store receives the action objects and then updates its state
- Redux action can also carry some data (optional)
- Actions must carry a `type` property that specifies the 'type' of action that occured
  ```Javascript
  const action = { type: 'LOGIN' }
  ```
- **`actionCreator()`** is a function that returns the action object when called
  ```Javascript
  const actionCreator = function() {
    return action
  }
  ```
- **`store.dispatch()`** sends an action back to the store
  ```Javascript
  
  ```