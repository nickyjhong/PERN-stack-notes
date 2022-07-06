# freeCodeCamp Redux Notes
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
 - Common practice is to assign action types as read-only constants, then reference the constants wherever they are used
    - Not necessary. Code still works without doing this

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

### `store.subscribe()`
- Allows you to subscribe listener functions to the store, which are called whenever an action is dispatched against the store
  ```Javascript
  let count = 0;

  const increment = () => count += 1
  store.subscribe(increment)

  store.dispatch({type: ADD});
  console.log(count);
  ```

### **`combineReducers()`** 
- Allows you to combine reducers
- Accepts an object as an argument
  - The object is where you define properties which associate keys to specific reducer functions
  - The name given to the keys will be used by Redux as the name for the associated piece of state
- Root reducer (consists of multiple reducers)
  - Root reducer is then passed into the Redux `createStore()` method
  ```Javascript
  const rootReducer = Redux.combineReducers({
    auth: authenticationReducer,
    notes: notesReducer
  });
  ```
    - The key `notes` will contain all state associated with notes and handled by `notesReducer`

### Middleware for Asynchronous Actions
- `Redux Thunk middleware`
  - To include it, you pass it as an argument to `Redux.applyMiddleware()`
    - This is then provided as a second optional parameter to the `createStore()` function
  ```Javascript
  const store = Redux.createStore(
    reducer,
    Redux.applyMiddleware(ReduxThunk.default)
  );
  ```
### Spread Operator
```Javascript
let newArray = [...MyArray];
// newArray is now a clone of myArray
```

```Javascript
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      return [...state, action.todo]
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```

## Counter
```Javascript
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
};

const incAction = function() {
  return {
    type: INCREMENT
  }
}; 

const decAction = function() {
  return {
    type: DECREMENT
  }
};

const store = Redux.createStore(counterReducer, Redux.applyMiddleware(ReduxThunk.default)); 
```

## To Do
- State immutability!
```Javascript
const ADD_TO_DO = 'ADD_TO_DO';

const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      return [...state, action.todo]
      // return state.concat(action.todo);
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```