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
- export `React.createContext()` to create context and use in rest of application
- `Context.Provider` - wrap this around everything that needs access to the context
  - Has a single prop called `value` which is value of context
  ```js
  const ThemeContext = React.createContext()
  function App() {
    const [theme, setTheme] = useState('dark')

    return(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ChildComponent />
      </ThemeContext.Provider>
    )
  }
  ```
  ```js
  function ChildComponent() {
    return <GrandChildComponent />
  }
  ```
- `Context.Consumer` - wrap this around code to access the value of the context **FOR CLASS COMPONENTS**
    ```js
    class GrandChildComponent {
      render() {
        return (
          <ThemeContext.Consumer>
            {({ theme, setTheme }) => {
              return (
                <>
                  <div>The theme is {theme}</div>
                  <button onClick={() => setTheme('light')}>
                    Change to Light Theme
                  </button>
                </>
              )
            }} 
          </ThemeContext.Consumer>
        )
      }
    }
    ```
<br>...
- **`useContext` will do everything for you!**
  - Can cut out consumer portion of context and remove complex nesting

  ```js
  function GrandChildComponent() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
      <>
        <div>The theme is {theme}</div>
        <button onClick={() => setTheme('light')}>
          Change to Light Theme
        </button>
      </>
    )
  }
  ```
<br>

<br>Example:

```js
// App.js
import React, { useState } from 'react'
import FunctionContextComponent from './FunctionContextComponent'
import ClassContextComponent from './ClassContextComponent'

export const ThemeContext = React.createContext()

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true)

  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        // all of the following have access to context
        <button onClick={toggleTheme}>Toggle Theme</button>
        <FunctionContextComponent />
        <ClassContextComponent />
      </ThemeContext.Provider>
    </>
  )
}
```
```js
// ClassContextComponent.js
import React, { Component } from 'react'
import { ThemeContext } from './App'

export default class ClassContextComponent extends Component {
  themeStyles(dark) {
    return {
      backgroundColor: dark ? '#333' : '#CCC',
      color: dark ? '#CCC' : '#333',
      padding: '2rem',
      margin: '2rem'
    }
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {darkTheme => {
          return <div style={this.themeStyles(darkTheme)}>Class Theme</div>
        }}
      </ThemeContext.Consumer>
    )
  }
}
```
```js
// FunctionContextComponent.js
import React, { useContext } from 'react'
import { ThemeContext } from './App'

export default function FunctionContextComponent() {
  const darkTheme = useContext(ThemeContext)
  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#CCC',
    color: darkTheme ? '#CCC' : '#333',
    padding: '2rem',
    margin: '2rem'
  }
  return (
    <div style={themeStyles}>Function Theme</div>
  )
}
```
<br>

<br>Simplification:
  - Make a new .js file just for context
  - "ThemeContext" is for the darkTheme state
  - "ThemeUpdateContext" is for the toggleTheme function (setting darkTheme state)

```js
// ThemeContext.js
import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true)

  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  return(
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}
```
```js
// App.js
import React from 'react'
import FunctionContextComponent from './FunctionContextComponent'
import { ThemeProvider } from './ThemeContext'

export const ThemeContext = React.createContext()

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FunctionContextComponent />
      </ThemeProvider>
    </>
  )
}
```
```js
// FunctionContextComponent.js
import React, {useContext} from 'react'
import { ThemeContext } from './App'

export default function FunctionContextComponent() {
  const darkTheme = useContext(ThemeContext)
  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#CCC',
    color: darkTheme ? '#CCC' : '#333',
    padding: '2rem',
    margin: '2rem'
  }
  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div style={themeStyles}>Function Theme</div>
    </>
  )
}
```
<br>

<br>Custom hooks:
- Get rid of "ThemeContext" in App.js
- In ThemeContext.js, create custom hooks
  - Wrap "ThemeContext" in useContext in useTheme
  - Wrap "ThemeUpdateContext" in useContext in useThemeUpdate


```js
// ThemeContext.js
import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true)

  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  return(
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}
```
```js
// App.js
import React from 'react'
import FunctionContextComponent from './FunctionContextComponent'
import { ThemeProvider } from './ThemeContext'

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FunctionContextComponent />
      </ThemeProvider>
    </>
  )
}
```
```js
// FunctionContextComponent.js
import React from 'react'
import { useTheme, useThemeUpdate } from './ThemeContext'

export default function FunctionContextComponent() {
  const darkTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#CCC',
    color: darkTheme ? '#CCC' : '#333',
    padding: '2rem',
    margin: '2rem'
  }
  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div style={themeStyles}>Function Theme</div>
    </>
  )
}
```
<!-- ## Lesser Used Hooks


## Optional Hooks


## Custom Hooks -->


## Resources:

#### [🔗 **useState Hook**](https://reactjs.org/docs/hooks-state.html)
#### [🔗 **React Context**](https://reactjs.org/docs/context.html)