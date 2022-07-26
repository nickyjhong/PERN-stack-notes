# [React Hooks](https://reactjs.org/docs/hooks-reference.html)
[⬅ Go Back](/week7.md)

## About Hooks
- Can **only** use `useState` inside of functional components (NO CLASS COMPONENTS)
- Hooks must always execute in the same order in every component render
  - Must be at the top level - no blocks, no nests, etc.

## Must Know Hooks
### `.useState()`
  - Use an array when using useState!!
  - `useState(defaultState)`
    - First value is `state`
    - Second value is a function that lets you update your state
    ```js
    // count is the state and setCount is the function
    const [count, setCount] = useState(4)
    ```
    ```js
    import React, { useState } from 'react'

    function App() {
      const [count, setCount] = useState(4)

      function decrementCount() {
        // need to set state using function and previous state
        setCount(prevCount => prevCount - 1)
      }

      function incrementCount() {
        setCount(prevCount => prevCount + 1)
      }
    
      return(
        <>
          <button onClick={decrementCount}>-</button>
          <span>{count}</span>
          <button onClick={incrementCount}>+</button>
        </>
      )
    }
    ```
    - The value "4" in our `useState` gets called every single time we run our function -> can start slow down performance of app if complex
  - `useState(() => {})`
    - Only runs the function the very first time the component renders
  - `useState({})`
    - Everything in previous state gets overwritten!!! They do **not** automatically get merged
      - Need to spread if you want to keep previous state
    ```js
    import React, { useState } from 'react'

    function App() {
      const [count, setCount] = useState({ count: 4, theme: 'blue' })
      const count = state.count
      const theme = state.theme

      function decrementCount() {
        setState(prevState => {
          return { ...prevState, count: prevState.count - 1 }
        })
      }

      function incrementCount() {
        setState(prevState => {
          return { ...prevState, count: prevState.count + 1 }
        })
      }
    
      return(
        <>
          <button onClick={decrementCount}>-</button>
          <span>{count}</span>
          <button onClick={incrementCount}>+</button>
        </>
      )
    }
    ```
    - They don't get merged because normally you would make multiple `useState`s
      ```js
      function App() {
        const [count, setcount] = useState(4)
        const [theme, setTheme] = useState('blue')

        function decrementCount() {
          setCount(prevCount => prevCount - 1)
        }

        function incrementCount() {
          setCount(prevCount => prevCount + 1)
        }

        return(
          <>
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <button onClick={incrementCount}>+</button>
          </>
        )
      }
      ```


### `.useEffect()`


### `.useContext()` and `.createContext()`
- Create a context using `.createContext()` in App/Main

## Lesser Used Hooks


## Optional Hooks


## Custom Hooks