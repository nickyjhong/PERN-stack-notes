# React Native Uber Clone
[⬅ Go Back](/README.md)

## Making a React Native app
1. Use Expo!
    ```js
    expo init PROJECTNAME
    cd PROJECTNAME
    npm start
    ```
## Setting up and implementing Redux
1. Set up redux
    ```js
    npm install @reduxjs/toolkit
    // or
    yarn add @reduxjs/toolkit
    ```
2. Make a Provider
  - Import from react-redux
    ```js
    npm i react-redux
    ```
    ```js
    import { Provider } from 'react-redux';
    ```
3. Wrap entire `App` in `Provider`
4. Add `store` to `Provider`
    ```js
    <Provider store={}>
    ```
5. Make `slices` folder and make `navSlice.js`
  - Responsible for everything about navigation
  - Import createSlice
    ```js
    import { createSlice } from '@reduxjs/toolkit'
    ```
  - Define initialState of data layout (will use API to define information)
    ```js
    const initialState = {
      origin: null,
      destination: null,
      travelTimeInformation: null
    }
    ```
  - Create slice
    - Needs a name, initialState, and reducer
    - Need a way to *dispatch* the action
    ```js
    export const navSlice = createSlice({
      name: 'nav',
      initialState,
      reducer: {
        setOrigin: (state, action) => {
          state.origin = action.payload
        },
        setDestination: (state, action) => {
          state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
          state.travelTimeInformation = action.payload;
        }
      }
    });
    ```
  - Expose rest of application to actions by exporting!
    ```js
    export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;
    ```
  - Selectors (to pull information from data)
    - state.SLICENAME.SPECIFICSTATE
    ```js
    export const selectOrigin = (state) => state.nav.origin
    export const selectDestination = (state) => state.nav.destination;
    export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

    export default navSlice.reducer;
    ```
6. Make `store.js`
  - Check redux documentation
    ```js
    // lets you make a store
    import { configureStore } from '@reduxjs/toolkit';
    // navigation slice - stores navigation information
    import navReducer from './slices/navSlice';

    export const store = configureStore({
      reducer: {
        nav: navReducer
      }
    })
    ```
7. Import `store` to `App` and put in `Provider`
    ```js
    import { store } from './store';
    
    <Provider store={store}>
    ```