# Thunks
[⬅ Go Back](../week4.md)

## Notes
- Specific to fetch/axios
- Why is it necessary?
  - We use thunk middleware to help us change state and perform async tasks
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
- Checks the incoming action **before reaching the reducer**
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

```Javascript
import axios from "axios";

export const GOT_BALLOONS = "GOT_BALLOONS";
export const BALLOONS_ERROR = "BALLOONS_ERROR";

export function createGotBaloonsAction(balloons) {
  return { type: GOT_BALLOONS, balloons };
}

export function createBalloonsErrorAction(error) {
  return { type: BALLOONS_ERROR, error };
}

// THUNK
export function createGetBalloonsThunk() {
  return async dispatch => {
    try {
      const { data } = await axios.get('/balloons')
      dispatch(createGotBaloonsAction(data))
    } catch (error) {
      dispatch(createBalloonsErrorAction(error))
    }
  }
}
```

```Javascript
const gotPets = (pets) => ({
  type: GOT_PETS_FROM_SERVER,
  pets
})

// THUNK
export const getPets = () => {
  return async (dispatch, getState, {axios}) => {
    const {data} = await axios.get('/pets')
    dispatch(gotPets(data))
  }
}
```