# [React Hooks](https://reactjs.org/docs/hooks-reference.html)
[⬅ Go Back](/week7.md)

## About Hooks
- Can **only** use `useState` inside of functional components (NO CLASS COMPONENTS)
- Hooks must always execute in the same order in every component render
  - Must be at the top level - no blocks, no nests, etc.

## Must Know Hooks
### `useState()`
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
    - The value "4" in our `useState` gets called every single time we run our function -> can start slow downperformance of app if complex
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

### `useEffect()`
- No lifecycle hooks!
- The most basic way to use `useEffect` is by passing a single function to it
  - This function will run on every render of the component
- `useEffect` takes a second parameter (array)
  - Whatever is passed into the array are values -> whenever the values change, the hook runs
  - Empty array only runs on mount
  ```js
  useEffect(() => {
    console.log('on mount')
  }, [])
  ```
  ```js
  import React, { useState, useEffect } from 'react'

  export default function App() {
    const [resourceType, setResourceType] = useState('posts')
    const [items, setItems] = useState([])

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(response => response.json())
        .then(json => setItems(json))
    }, [resourceType])

    return(
      <>
        <div>
          <button onClick={() => setResourceType('posts')}>Posts</button>
          <button onClick={() => setResourceType('users')}>Users</button>
          <button onClick={() => setResourceType('comments')}>Comments</button>
        </div>
        <h1>{resourceType}</h1>
        {items.map(item => {
          return <pre>{JSON.stringify(item)}</pre>
        })}
      </>
    )
  }
  ```
- To change the window width (number display) when window is resized
  ```js
  import React, { useState, useEffect } from 'react'

  export default function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
      window.addEventListener('resize', handleResize)
    }, [])

    return (
      <div>{windowWidth}</div>
    )
  } 
  ```
- To clean up a side effect, return a function from the side effect inside `useEffect`
  - That function will be run every time the side effect is re-ran
  ```js
  useEffect(() => {
    console.log('This is my side effect')

    return () => {
      console.log('This is my clean up')
    }
  })

  // MOUNTED
  // This is my side effect

  // RE-RENDER 1:
  // This is my clean up
  // This is my side effect

  // RE-RENDER 2:
  // This is my clean up
  // This is my side effect

  // UN-MOUNT:
  // This is my clean up
  ```


  ```js
  import React, { useState, useEffect } from 'react'

  export default function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    return (
      <div>{windowWidth}</div>
    )
  } 
  ```
### `useContext()` and `createContext()`
- Create a context using `createContext()` in App/Main

## Lesser Used Hooks


## Optional Hooks


## Custom Hooks


## Resources:

#### [🔗 **useState Hook**](https://reactjs.org/docs/hooks-state.html)
#### [🔗 **React Context**](https://reactjs.org/docs/context.html)