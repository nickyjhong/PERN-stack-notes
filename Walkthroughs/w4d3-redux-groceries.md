# [W4D3 Redux Groceries Walkthrough](https://github.com/FullstackAcademy/PairExercise.ReduxGroceries)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `npm start`
- `npm install redux`
- `npm install react-redux`
- `npm install --save redux-logger`

## Adding the React Presentational Components
- `touch client/components/AddGrocery.js client/components/GroceryList.js client/components/GroceryItem.js client/components/Footer.js`
- `App.js` is the root
  - `AddGrocery`, `GroceryList`, and `Footer` are children
- `Footer.js` will have links to filter the groceries (done in extra credit)
- `GroceryItem.js` expects three props: `onClick`, `bought`, `text`
  - `bought` and `text` are used to display the item and style it
  - `onclick` is a function and passed to `<li>`
- `GroceryList.js` expects `groceries` as a prop and then maps over it to create `GroceryItems`
- `App.js` - add `{...grocery}` prop to `GroceryItem` and a key
  - Spread takes all properties of `grocery` and passes them down as individual props
  - Same as `<GroceryItem key={1} id={1} text="Milk" bought={false} />`
- `AddGrocery.js`
  - Renders a form field and button
  - Controls form input value
  - Expects an `add` callback function 

## The Redux Store
- Make `store.js` in `client`
  - Make action type, action creator, and reducer
  - `addGrocery` is a function that takes a string (name of item) and returns object with three properties: `type`, `id`, `text`
    - Everything except `type` is often referred to as `payload`
  - Reducer has a switch statement
    - Initial state for groceries is an empty array
    - Receive an action with `ADD_GROCERY` type
    - Append new grocery item
    - Return new state object
    ```Javascript
    const initialState = { groceries: [] };

    function reducer (state = initialState, action) {
      switch (action.type) {
        case ADD_GROCERY:
          const newGrocery = {
            id: action.id,
            text: action.text,
            bought: false
          };
          // spread operator includes everything that was not explicitly mentioned
          return { ...state, groceries: [...state.groceries, newGrocery] };
        default: 
          return state;
      }
    }
    ```
  - Use `createStore` to create the store and then export it
    ```Javascript
    import {createStore} from 'redux'
    ...
    const store = createStore(reducer)
    export default store
    ```
## Connecting the Components
-  `client/index.js`
  - Import `Provider` from 'react-redux' and `store` from './store'
  - Wrap `<App />` with `Provider`
  - `Provider` takes `store` as a prop
  ```Javascript
  import React from "react";
  import { render } from "react-dom";
  import { Provider } from 'react-redux'
  import App from "./components/App";
  import store from './store'

  render(
    <Provider store={store}>
      <App /> 
    </Provider>,
    document.getElementById("root")
  );
  ```
- `client/components/GroceryList.js`
  - Import `connect` from 'react-redux'
  - `mapStateToProps` {groceries: state.groceries} so it's accessible as a prop
  ```Javascript
  import { connect } from 'react-redux'
  ...
  const mapStateToProps = state => ({groceries: state.groceries})
  export default connect(mapStateToProps)(GroceryList)
  ```
- `client/components/AddGrocery.js`
  - Import `connect` and `addGrocery`
  - `mapDispatchToProps` to make an `add` function
  ```Javascript
  import {connect} from 'react-redux'
  import { addGrocery } from "../store";

  function mapDispatchToProps (dispatch) {
    return {
      add: function (text) {
        dispatch(addGrocery(text));
      }
    };
  }

  export default connect(null, mapDispatchToProps)(AddGrocery);
  ```
## Logging Middleware
- `client/store.js`
  ```Javascript
  import { createStore, applyMiddleware } from 'redux';
  import loggerMiddleware from 'redux-logger';
  ...
  const store = createStore(reducer, applyMiddleware(loggerMiddleware))
  ```

## Bonus: Toggling Grocery Items
- `client/store.js`
  - Make an action type and action creator
  - Update the reducer
    - For some reason it only works when `TOGGLE_GROCERY`'s case is written as a ternary
  ```Javascript
  const TOGGLE_GROCERY = 'TOGGLE_GROCERY';

  export const toggleGrocery = id => (
    {
      type: TOGGLE_GROCERY,
      id
    }
  )

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_GROCERY: 
        const newGrocery = {
          id: action.id,
          text: action.text,
          bought: false
        }
        return { ...state, groceries: [...state.groceries, newGrocery] };
      case TOGGLE_GROCERY:
        // let groceryListArray = state.groceries;
        // groceryListArray.map(grocery => {
        //   if (action.id === grocery.id) {
        //     return {...grocery, bought: !grocery.bought}
        //   } else {
        //     return grocery;
        //   }
        // });
        // return {...state, groceryListArray}
        let groceries = state.groceries.map(grocery => {
          return grocery.id === action.id
            ? { ...grocery, bought: !grocery.bought }
            : grocery;
          });
          return { ...state, groceries };
      default:
        return state;
    } 
  }
  ```
- `client/components/GroceryList.js`
  - Import `toggleGrocery`
    - This comes from the container component created by `connect`
  - Add an `onClick` that will toggle the grocery item!
  - `mpaDispatchToProps` should return an object with a `toggleGrocery` function
  ```Javascript
  import React from "react";
  import GroceryItem from "./GroceryItem";
  import { connect } from 'react-redux';
  import { toggleGrocery } from '../store';

  const GroceryList = (props) => (
    <ul>
      {props.groceries.map(grocery => (
        <GroceryItem key={grocery.id} id={grocery.id} {...grocery} onClick={() => props.toggleGrocery(grocery.id)}/>
      ))}
    </ul>
  );

  // const mapStateToProps = state => ({groceries: state.groceries})
  const mapStateToProps = state => {
    return {groceries: state.groceries}
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      toggleGrocery: function(id) {
        dispatch(toggleGrocery(id))
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(GroceryList)
  ```