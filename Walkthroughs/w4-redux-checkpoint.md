# [W4 Redux Checkpoint Walkthrough](https://github.com/FullstackAcademy/Checkpoint-Redux)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `npm test`

## Redux Specs
- `src/01-redux/action-creator.js`
  - Make action types
  ```Javascript
  export const PREVIEW_PET = 'PREVIEW_PET'
  export const ADOPT_PET = 'ADOPT_PET'
  export const ADD_NEW_DOG = 'ADD_NEW_DOG'
  export const ADD_NEW_CAT = 'ADD_NEW_CAT'
  export const REMOVE_DOG = 'REMOVE_DOG'
  export const REMOVE_CAT = 'REMOVE_CAT'
  ```
  - Make action creators
  ```Javascript
  export const adoptPet = (pet) => {
  return {
    type: ADOPT_PET,
    pet
    }
  };

  export const previewPet = (pet) => {
    return {
      type: PREVIEW_PET,
      pet
    }
  };

  export const addNewDog = (dog) => {
    return {
      type: ADD_NEW_DOG,
      dog
    }
  };

  export const addNewCat = (cat) => {
    return {
      type: ADD_NEW_CAT,
      cat
    }
  };

  export const removeDog = (dog) => {
    return {
      type: REMOVE_DOG,
      dogId: dog.id
    }
  };

  export const removeCat = (cat) => {
    return {
      type: REMOVE_CAT,
      catId: cat.id
    }
  };
  ```
- `src/01-redux/reducer.js`
  - Set initial state
    ```Javascript
    const initialState = {
      dogs: [],
      cats: [],
      petToPreview: {},
      petToAdopt: {}
    };
    ```
  - Import action types
    ```Javascript
    import { PREVIEW_PET, ADOPT_PET, ADD_NEW_DOG, ADD_NEW_CAT, REMOVE_DOG, REMOVE_CAT } from './action-creators'
    ```
  - Reducers take in two parameters - previous state and action
    - Default parameter value can be initial return value
    - Use the spread operator to keep everything else that was in state!!!
    ```Javascript
      export default function(state = initialState, action) {
        switch (action.type) {
          case PREVIEW_PET:
            return {...state, petToPreview: action.pet};
          case ADOPT_PET: 
            return {...state, petToAdopt: action.pet}
          case ADD_NEW_DOG:
            // dogs is an array so the dogs array needs to return previous dogs + new dog
            return {...state, dogs: [...state.dogs, action.dog]}
          case ADD_NEW_CAT:
            return {...state, cats: [...state.cats, action.cat]}
          case REMOVE_DOG:
            // removeDog looks for a dog with an id and removes it
            // filter should return all dogs that do not have that id
            return {...state, dogs: state.dogs.filter(dog => dog.id !== action.dogId)}
          case REMOVE_CAT:
            return {...state, cats: state.cats.filter(cat => cat.id !== action.catId)}
          default:
            return state
        }
      }
    ```
## Combine-Reducers Specs
- `src/02-combine-reducers/reducer.js`
  - ageReducer - case HAD_A_BIRTHDAY means age goes up 1
    ```Javascript
    function ageReducer(age = 0, action) {
      switch (action.type) {
        case HAD_A_BIRTHDAY:
          return age + 1
        default:
          return age;
      }
    }
    ```
  - posessionsReducer - case BOUGHT_AN_ITEM returns all previous possessions in array + new possession
    ```Javascript
    function possessionsReducer(possessions = [], action) {
      switch (action.type) {
        case BOUGHT_AN_ITEM:
          return [...possessions, action.item]
        default:
          return possessions;
      }
    }
    ```
  - cashReducer - case RECEIVED_A_PAYCHECK means cash + amountAfterTaxes, case BOUGHT_AN_ITEM subtracts price of item
    ```Javascript
    function cashReducer(cash = 0, action) {
      switch (action.type) {
        case RECEIVED_A_PAYCHECK:
          return cash + action.amountAfterTaxes
        case BOUGHT_AN_ITEM:
          return cash - action.price
        default:
          return cash;
      }
    }
    ```

## Thunks
- `src/03-thunks/action-creators.js`
  - Thunk async/await
  - Wrap in a try/catch to handle error
  - Get the data from  the `'/balloons'` page
    - Dispatch `createGotBaloonsAction` (there's a typo on the function but it was pre-made...)
  - If there was an error, dispatch `createBalloonsErrorAction` and pass in the `error`
    ```Javascript
    export function createGetBalloonsThunk() {
      return async (dispatch) => {
        try {
          const { data } = await axios.get('/balloons')
          dispatch(createGotBaloonsAction(data))
        } catch (error) {
          dispatch(createBalloonsErrorAction(error))
        }
      }
    }
    ```