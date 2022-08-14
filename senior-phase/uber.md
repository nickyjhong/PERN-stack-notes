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
## Building `HomeScreen`
1. Make a `screens` folder and make a `HomeScreen.js` in it (functional component)
  - Type `rnfes` for react native functional export component with stylesheet
2. Import `HomeScreen` into `App`
  - Use `SafeAreaView` so the text isn't in the "safe area" aka where time and battery is
3. Install tailwind and import it
    ```js
    npm i twrnc
    import tw from 'twrnc';
    ```
4. Put in Uber logo using Image tag and source uri: https://links.papareact.com/gzs

## Building `NavOptions`
1. Make a `components` folder and make a `NavOptions.js` in it (`rnfes`)
2. Import `NavOptions` in the View under the Image in `HomeScreen`
3. Make a data array
  - Once you implement React Native Navigation and you click on one of the pieces of data, it will lead to the `screen`
    ```js
    const data = [
      {
        id: '123',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen',
      }, {
        id: '456',
        title: 'Order" food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen',
      }
    ]
    ```
4. FlatList
  - Will render out everything we need
  - Pass in the data
  - keyExtractor takes an item and gets the id
  - Typically a vertical list by default (make it horizontal!)
  - renderItem takes an arrow function
    - Takes a destructured item
    - Make it a TouchableOpacity
      - Put Image, Text, and Icon a View in the TouchableOpacity
      - Install react native elements, vector icons, and safe area context
        ```js
        npm i react-native-elements
        npm i react-native-vector-icons
        npm i react-native-safe-area-context
        ```
  - Import SafeAreaProvider into `App` and wrap everything in it
5. Create `MapScreen.js` in `screens`