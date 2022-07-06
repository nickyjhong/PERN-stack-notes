# Thunks
[⬅ Go Back](../week4.md)

## Notes
- Thunks is a function that returns another function to be performed later
- Pass it to a `dispatch()` **instead of an action**
  ```Javascript
  const getAddFunction = function() {
    return function(a, b) {
      return a + b;
    }
  }

  const addFunction = getAddFunction();

  addFunction(5, 17); // 22
  getAddFunction()(6, 10); // 16
  ```
- Helps you stay DRY
- Removes "responsibility" for async code/side effects from componenets
  - Components dispatch whether an action is async or not

### Thunk Middleware
- Checks the incoming action
  - If action is a regular object, do nothing
  - If action is a function:
    - Invoke it and pass the `dispatch` and `getState` methods to it!

- What's going on under da hood:
```Javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument;)
    }
    return next(action);
  }
}
```

```Javascript
const thunkFunction = (dispatch, getState) => {
  // logic here that can dispatch actions or read state
}

store.dispatch(thunkFunction)
```
```Javascript
// fetchTodoById is the "thunk action creator"
export function fetchTodoById(todoId) {
  // fetchTodoByIdThunk is the "thunk function"
  return async function fetchTodosThunk(dispatch, getState) {
    const response = await client.get(`/fakeApi/todo/${todoId}`)
    dispatch(todosLoaded(response.todos))
  }
}
```

```Javascript
// An example of a thunk dispatching other action creators,
// which may or may not be thunks themselves. No async code, just
// orchestration of higher-level synchronous logic.
function complexSynchronousThunk(someValue) {
  return (dispatch, getState) => {
    dispatch(someBasicActionCreator(someValue))
    dispatch(someThunkActionCreator())
  }
}
```