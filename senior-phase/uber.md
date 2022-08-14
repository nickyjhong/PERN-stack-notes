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
      reducers: {
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

## React Native Navigation
1. Install React Native Navigation and related things
    ```js
    npm i @react-navigation/native
    expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
    npm install @react-navigation/native-stack
    ```
2. Import into `App` and wrap everything under Provider in NavigationContainer
    ```js
    import 'react-native-gesture-handler';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    ```
3. Make a Stack and put it inside the SafeAreaProvider - works similarly to Router in React
    ```js
    export default function App() {
      const Stack = createNativeStackNavigator()
      return (
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaProvider>
              <Stack.Navigator>
                <Stack.Screen 
                  name='HomeScreen'
                  component={HomeScreen}
                  options={{
                    headersShown: false,
                  }}
                />
              </Stack.Navigator>
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      );
    }
    ```
4. Go to `NavOptions` and make a useNavigation Hook
    ```js
    const navigation = useNavigation();
    ```
5. In the TouchableOpacity, make an onPress
  - What's passed into `navigation.navigate()` directly correlates to the name given in `App`'s Stack.Screen
    ```js
    <TouchableOpacity
      onPress={() => navigation.navigate('MapScreen')}
      style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
    >
    ```
  
### Google Places API
1. [Instructions](https://github.com/FaridSafi/react-native-google-places-autocomplete)
2. Make a `.env` file and add in GOOGLE_MAPS_API=pasteAPIkeyhere
3. `npm i react-native-dotenv` and add to plugins
4. Import into `HomeScreen`
    ```js
    import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
    import { GOOGLE_MAPS_APIKEY } from '@env';
    ```
 5. Add in styles and query
    ```js
    <GooglePlacesAutocomplete
      placeholder="Where From?"
      styles={{
        container: {
          flex: 0
        },
        textInput: {
          fontSize: 18
        }
      }}
      enablePoweredByContainer={false}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en'
      }}
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={400}
    />
    ```
6. Add an onPress
  - Arrow function with data and details
    ```js
    onPress={(data, details=null) => {

    }}
    fetchDetails={true}
    returnKeyType={'search'}
    minLength={2}
    enablePoweredByContainer={false}
    ```
7. Make a dispatch
    ```js
    import { useDispatch } from 'react-redux'
    import { setDestination, setOrigin } from '../slices/navSlice';

    const dispatch = useDispatch();
    ```
8. Use the dispatch in onPress
    ```js
    onPress={(data, details=null) => {
      dispatch(setOrigin({
        location: details.geometry.location,
        description: data.description
      }))
      dispatch(setDestination(null))
    }}
    ```