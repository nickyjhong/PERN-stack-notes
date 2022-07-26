# WebDevSimplified React Notes
[⬅ Go Back](/week7.md)

## Notes
- `npx create-react-app .`
- `ES7+ React/Redux/React-Native snippets` on VS Code
    - Type in `rfc` and press `enter` for boilerplate


### JSX
- JSX lets us write HTML inside of our JS
- Use `()` in return to return nested elements
- Can also use `<> </>` instead of wrapping in `<div> </div>` to return multiple elements without putting it in a `<div>`
- `className` instead of `class`
- All tags **must** be closed!

### Class Component
```Javascript
import React, { Component } from 'react'
```

#### Props
- Set props in JSX the same way you set attributes in HTML
- `Constructor` and `super` always take in `props`
    ```Javascript
    function App() {
        return (
            <Counter initialCount={0}/>
        );
    }
    ```
    ```Javascript
    import React, { Component } from 'react'

    export default class Counter extends Component {
        constructor(props) {
            super(props)
            this.state = {
                count: props.initialCount
            }
        }
        render() {
            return (
                <div>
                    <button>-</button>
                    <span>{this.state.count}</span>
                    <button>+</button>
                </div>  
            )
        }
    }
    ```

#### `this.setState()`
- Takes an object as an argument
- Essentially uses `Object.assign` to overwrite the keys passed in

```Javascript
changeCount(num) {
    this.setState({count: this.state.count + num})
}
...
<button onClick={() => this.changeCount(-1)}>-</button>
```
- If the `onClick` was not written with an arrow function, `changeCount` would have to be binded:
    ```Javascript
    this.changeCount = this.changeCount.bind(this)

    changeCount(num) {
        this.setState({count: this.state.count + num})
    }

    <button onClick={changeCount}>-</button>
    ```
- If you are using the `prevState` (previous state), you need to use the function version of `setState`
    - **Use this if you need to access the current value of the state to set the new state!! Otherwise, use the object version of `setState`**
    - `setState` is asynchronous in that the value of our state does not update immediately when we call `setState`
    - We cannot rely on our `this.state` variable to be update with the newest value when we call `setState`
    - Using the function version of `setState` will pass the current value of our state into the function, which means we can use that value in place of `this.state` to get the most up to date value
    ```Javascript
    changeCount(num) {
        this.setState(prevState => {
            return {count: this.state.count + num}
        }
    )}
    ```
- If you do not need the `prevState`, you can use the object version

### Functional Component
- Can access `state` with `hooks` in functional components
- Can use object deconstruction in arguments instead of passing in `prop`
```Javascript
export default function CounterHooks(props) {
    return (
        <div>
            <button>-</button>
            <span>{props.initialCount}</span>
            <button>+</button>
        </div>  
    )
}
```
VS
``` Javascript
export default function CounterHooks({ initialCount }) {
    return (
        <div>
            <button>-</button>
            <span>{initialCount}</span>
            <button>+</button>
        </div>  
    )
}
```

#### `useState()`
- Functional components don't have state, **but** you can access it using `useState()`
- useState returns state as an array
    - Deconstruct the array!
        - First value is state
        - Second value is function that lets you set the state
    ```Javascript
    export default function CounterHooks({ initialCount }) {
        const [state, setState] = useState({ count: initialCount })
        return (
            <div>
                <button>-</button>
                <span>{state.count}</span>
                <button>+</button>
            </div>  
        )
    }
    ```
- This code block is huge:
    ```Javascript
    export default function CounterHooks({ initialCount }) {
        const [state, setState] = useState({ count: initialCount })
        return (
            <div>
                <button onClick={() => setState(prevState => {
                    return { count: prevState.count - 1 }
                })}>-</button>
                <span>{state.count}</span>
                <button onClick={() => setState(prevState => {
                    return { count: prevState.count + 1 }
                })}>+</button>
            </div>  
        )
    }
    ```
- We can use whatever we want for our `state`
    1. Make `state` a single number, `initialCount`
    2. Instead of returning a full object called `state`, we're returning the `count`
    3. Instead of setting the state, we're setting the count `setCount`
    4. `setCount()` takes the previous count `prevCount` and add/subtract 1
        ```Javascript
        export default function CounterHooks({ initialCount }) {
            const [count, setCount] = useState(initialCount)
            return (
                <div>
                    <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
                    <span>{count}</span>
                    <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
                </div>  
            )
        }
        ```
- Hooks need to be on the very top level of your function and relies on you to call on them in the exact same order every single time
    - Hooks cannot be inside of an if/else statement or a loop

### Context
- Allows you to pass values into a stack of components, regardless of how deeply nested it is
- Use a theme
- Classes: 
    ```Javascript
    export const ThemeContext = React.createContext()
    ```
    - **Provider** - allows us to provide a value
    - **Consumer** - takes in the value provided
        ```Javascript
        import React, { useState } from 'react'
        import Counter from './Counter'
        import CounterHooks from './CounterHooks'

        export const ThemeContext = React.createContext()

        function App() {
        const [theme, setTheme] = useState('red')
        return (
            <ThemeContext.Provider value={{ backgroundColor: theme }}>
            Counter
            <Counter initialCount={0} />
            Counter Hooks
            <CounterHooks initialCount={0} />
            <button onClick={() => setTheme(prevTheme => {
                return prevTheme === 'red' ? 'blue' : 'red'
            })}>Toggle Theme</button>
            </ ThemeContext.Provider>
        );
        }

        export default App;
        ```
- Functional:
    - `useContext()`
        ```Javascript
        import React, { useState, useContext } from 'react'
        import { ThemeContext } from './App'

        export default function CounterHooks({ initialCount }) {
            const [count, setCount] = useState(initialCount)
            const style = useContext(ThemeContext)
            return (
                <div>
                    <button style={style} onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
                    <span>{count}</span>
                    <button style={style} onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
                </div>  
            )
        }
        ```

### Spread Operator
- Allows you to copy all parts of array or object into another array or object
```Javascript
// App.js
function App() {
  return(
    <RecipeList recipes={sampleRecipes}/>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on chicken\n 2. Put chicken in oven\n 3. Eat chicken'
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork\n 2. Put pork in oven\n 3. Eat pork'
  }
]
...
// RecipeList.js
export default function RecipeList({ recipes }) {
    return (
        <div>
            {recipes.map(recipe => {
                return (
                    <Recipe 
                        key={recipe.id}
                        {...recipe} 
                    />
                )
            })}
        </div>

  )
}
```

#### **`uuid()`** - universally unique identifier
- Generate unique Id
- Unique Id on demand
`npm install uuid@3.4.0`
OR
`import { v4 as uuidv4 } from 'uuid'`

#### **`useId()`**
- React 18 hook to generate unique Id
- Unique Id per component


## Hooks
- **`useState`** - allows you use add state to functional components
    - Same capabilities as `this.state` in class components
    - The only argument in `useState()` is the initial state
    - It returns a pair of values: the **current state** and **a function that updates it**
        - It is similar to `this.state._____` and `this.setState` except it is in a pair
    ```Javascript
    import React, { useState } from 'react';
    function Example() {
        const [ count, setCount ] = useState(0)
    }

    // class Example extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     count: 0
    //     };
    // }
    ```

## `createContext()`


## Resources:

#### [🔗 **useState Hook**](https://reactjs.org/docs/hooks-state.html)
#### [🔗 **React Context**](https://reactjs.org/docs/context.html)

    