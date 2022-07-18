# freeCodeCamp React-Redux Notes
[⬅ Go Back](/week4.md)

- React components can manage their own state locally
  - For larger projects, it's better to keep the app state in a single location with Redux
- `npm install react-redux`
  - Lets you pass Redux `state` and `dispatch` to React components as `props`

```Javascript
const ADD = 'ADD'

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
}

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message]
    default:
      return state
  }
}

const store = Redux.createStore(messageReducer)
```
- `<Provider>` allows you to provide `state` and `dispatch` to React components
  ```Javascript
  <Provider store={store}>
    <App/>
  </Provider>
  ```
- `mapStateToProps()`
  - React-Redux uses `store.subscribe()` to implement `mapStateToProps`
    ```Javascript
    const mapStateToProps = (state) => ({
      key: state.____
    })
    ```
- `mapDispatchToProps()`
  - React-Redux uses `store.dispatch()` to turn dispatch actions into properties
    ```Javascript
    const mapDispatchToProps = (dispatch) => {}
    ```

    ```Javascript
    const addMessage = (message) => {
      return {
        type: 'ADD',
        message: message
      }
    };

    const mapDispatchToProps = (dispatch) =>{
      return {
        submitNewMessage: (message) => {
          dispatch(addMessage(message))
        }
      }
    }
    ```
- `connect`
  - Use `connect` to map `state` and `dispatch` to `props` on React components
    ```Javascript
    connect(mapStateToProps, mapDispatchToProps)(MyComponent)
    ```
    - Both are optional arguments
    ```Javascript  
    connect (mapStateToProps)(MyComponent)
    connect(null, mapDispatchToProps)(MyComponent)
    ```