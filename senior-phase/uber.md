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
5. Create `slices` folder and create `navSlice.js`
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
6. Create `store.js`
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
1. Create a `screens` folder and create a `HomeScreen.js` in it (functional component)
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
1. Create a `components` folder and create a `NavOptions.js` in it (`rnfes`)
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
2. Create a `.env` file and add in GOOGLE_MAPS_API=pasteAPIkeyhere
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

## MapScreen Component
1. Create `Map.js` in components
2. Import `Map` into `MapScreen` and put into first view
    ```js
    const MapScreen = () => {
      return (
        <View>
          <Text>Map</Text>

          <View style={tw`h-1/2`}>
            <Map />
          </View>
          <View style={tw`h-1/2`}></View>

        </View>
      )
    }
    ```
3. `npm i react-native-maps`
4. `import MapView, {Marker} from 'react-native-maps'`
5. Use MapView and style it to take up all of the room on the first half (beyond safe view)
  - The following coordinates are examples from the react-native-maps docs! (shows SF)
    ```js
    const Map = () => {
      return (
        <MapView
          style={tw`flex-1`}
          mapType='mutedStandard'
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )
    }
    ```
6. Make a `useSelector()` to pull data from `navSlice`
    ```js
    const Map = () => {

      const origin = useSelector(selectOrigin);

      return (
        <MapView
          style={tw`flex-1`}
          mapType='mutedStandard'
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      )
    }
    ```
7. Add in a marker (pin)
    ```js
    <MapView
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
    </MapView> 
    ```
8. Update `NavOptions` so it isn't clickable if you don't add in details
9. Make a new stack!
    ```js
    import { createNativeStackNavigator } from '@react-navigation/native-stack'
    const Stack = createNativeStackNavigator();
    ```

    ```js
    const MapScreen = () => {
      const Stack = createNativeStackNavigator();
      return (
        <View>
          <View style={tw`h-1/2`}>
            <Map />
          </View>

          <View style={tw`h-1/2`}>
            <Stack.Navigator>
              <Stack.Screen 
                name="NavigateCard"
                component={NavigateCard}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name="RideOptions"
                component={RideOptions}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </View>
        </View>
      )
    }
    ```
10. Create `NavigateCard.js` and `RideOptions.js` and import them

## NavigateCard Part 1
1. Make the view SafeAreaView
2. Style with tailwind
3. Import
    ```js
    import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
    import { GOOGLE_MAPS_APIKEY } from '@env'
    ```
4. Use GooglePlacesAutocomplete in inner view
    ```js
    const NavigateCard = () => {
      return (
        <SafeAreaView style={tw`bg-white flex-1`}>
          <Text style={tw`text-center py-5 text-xl`}>Good morning, Nicole</Text>
          <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
              <GooglePlacesAutocomplete 
                placeholder="Where to?"
                styles={toInputBoxStyles}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                onPress={(data, details=null) => {

                }}
                enablePoweredByContainer={false}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
              />
            </View>
          </View>
        </SafeAreaView>
      )
    }
    ```
5. Dispatcher
    ```js
    import { useDispatch } from 'react-redux'
    import { setDestination } from '../slices/navSlice'
    import { useNavigation } from '@react-navigation/native'

    const dispatch = useDispatch()
    const navigation = useNavigation()
    ...
    onPress={(data, details=null) => {
      dispatch(setDestination({
        location: details.geometry.location,
        description: data.description
      }))
      navigation.navigate('RideOptions')
    }}
    ```

## Directions API
1. `npm i react-native-maps-directions`
2. Import
    ```js
    import { selectDestination, selectOrigin } from '../slices/navSlice'
    import MapViewDirections from 'react-native-maps-directions'
    import { GOOGLE_MAPS_APIKEY } from '@env'

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
    ...
    {origin && destination && (
      <MapViewDirections 
        origin={origin.description}
        destination={destination.description}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor='black'
      />
    )}
    ```
3. Zoom out when you set a destination so it shows point A (origin) and point B (destination) on the same map
  - useRef hook!
    ```js
    import React, { useRef } from 'react'
    const mapRef = useRef(null)
    ```
  - Add `ref={mapRef}` to <MapView>
  - Make useEffect (runs when page rerenders)
    ```js
    useEffect(() => {
      // origin and destination are dependencies
      // if origin or destination change at any time, the useEffect reruns

      // origin and destination refers to marker identifiers
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50}
      })
    }, [origin, destination])
    ```

## NavFavorites
1. Create a `NavFavorites.js` in components and make data
2. Import FlatList
  - Make data, keyExtractor, and renderItem
3. renderItem should be touchable opacity
    ```js
    const NavFavorites = () => {
      return (
        <FlatList 
          data={data}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => 
            <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
          }
          renderItem={({ item: { location, destination, icon} }) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
              <Icon 
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                name={icon}
                type="ionicon"
                color="white"
                size={18}
              />
              <View>
                <Text style={tw`font-semibold text-lg`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )
    }
    ```

## Keyboard Avoiding View
1. `import { KeyboardAvoidingView, Platform } from 'react-native';`
2. Use above the Navigator level in `App`
    ```js
    export default function App() {
      const Stack = createNativeStackNavigator()
      return (
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaProvider>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
              >
                <Stack.Navigator>
                  <Stack.Screen 
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen 
                    name='MapScreen'
                    component={MapScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Navigator>
              </KeyboardAvoidingView>
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      );
    }
    ```

## NavigateCard Part 2
1. Make a second view and add 2 TouchableOpacity
    ```js
    <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
      <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
        <Icon 
          name="car"
          type="font-awesome"
          color="white"
          size={16}
        />
        <Text style={tw`text-white text-center`}>Rides</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
        <Icon 
          name="fast-food-outline"
          type="ionicon"
          color="black"
          size={16}
        />
        <Text style={tw`text-center`}>Eats</Text>
      </TouchableOpacity>
    </View>
    ```
2. Add an onPress
