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
  const store = Redux.createStore(
    (state = {login: false}) => state
  );

  const loginAction = () => {
    return {
      type: 'LOGIN'
    }
  };

  store.dispatch(loginAction)
  ```
### `Reducer`
- After an action is created and dispatched, the Redux store needs to know how to respond!
- Reducers are responsible for state modifications that take place in response to actions
- A `reducer` take `state` and `action` as arguments, and **always** returns a new `state`
  - **This is the only role of a reducer!**
  - Reducers should never call an API endpoint or have any other side effects
- `state` is read-only, which means the `reducer` function must **always** return a new copy of `state` and never modify it directly
- Use a `switch` statement in the `reducer` to respond to different action events!
  ```Javascript
  const defaultState = {
    authenticated: false
  };

  const authReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {authenticated: true}
      case 'LOGOUT':
        return {authenticated: false}
      default:
        return defaultState
    }
  };

  const store = Redux.createStore(authReducer);

  const loginUser = () => {
    return {
      type: 'LOGIN'
    }
  };

  const logoutUser = () => {
    return {
      type: 'LOGOUT'
    }
  };
  ```