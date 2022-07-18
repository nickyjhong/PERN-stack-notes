# Redux Documentation Notes
[⬅ Go Back](/week4.md)

## Notes
### Three Principles
1. Single source of truth
  - The `global state` of your application is stored in an object tree within a single `store`

2. State is read only
  - The only way to change the state is to emit an `action`, or an object describing what happened
    - These `actions` are plain objects that can be logged, serialized, stored, and replayed for debugging or testing

3. Changes are made with pure functions
  - To specify how the state tree is transformed by actions, you write pure `reducers`
    - Pure functions that take the previous state and an action, and return the next state
  
### Reducer
```Javascript
type Reducer<S, A> = (state: S, action: A) => S
```
- A function that accepts an accumulation and a value and returns a new accumulation
- Used to reduce a collection of values down to a single value
- Most important concept in Redux

### Dispatching Function
```Javascript
type BaseDispatch = (a: Action) => Action
type Dispatch = (a: Action | AsyncAction) => any
```
- A function that accepts an action or an async action

## Resources:

#### [🔗 **Redux**](https://redux.js.org/)