# React Six Key Concepts
[⬅ Go Back](../week3.md)

## Six Key Concepts:
1. **Components**
    - React codebase is a large pile of big components that call smaller components
    - A component is a single object that outputs HTML and includes all the code needed to control the output
    - Think of `<select>` in HTML
    - Most common way to write a component is a `class` containing a `render` method that returns HTML
        ```Javascript
        class MyComponent extends React.Component {
            render() {
                return <p>Hello World!</p>;
            }
        }
        ```
2. **JSX**
    - [JSX](https://reactjs.org/docs/jsx-in-depth.html) (X stands for XML)
        ```Javascript
        class MyComponent extends React.Component {
            render() {
                return <p>Today is: {new Date()}</p>;
            }
        }
        ```
    - Can use ternary operator for `if` statements
        ```Javascript
        class MyComponent extends React.Component {
            render() {
                return <p>Hello {this.props.someVar ? 'World' : 'Kitty'}</p>;
            }
        }
        ```
3. **Props & State** 
    - HTML attributes like `<a>` tag's `href` attribute
    - Attributes are known as **props** (properties)
    - Props are how components talk to each other
    ```Javascript
    class ParentComponent extends React.Component {
        render() {
            return <ChildComponent message='Hello World'/>;
        }
    }
    class ParentC{omponent extends React.Component {
        render() {
            return <p>And then I said, "{this.props.message}"</p>;
        }
    }
    ```
    - React's data flow is unidirectional (data can only go from parent to child components)
    - **State** is not an inherent property
        - Just the temporary result of user input
        - Parent's state can be passed on to its children as a prop
    - State is managed using `setState`, which is often called inside an event handler
        ```Javascript
        class MyComponent extends React.Component {
            handleClick = (e) => {
                this.setState({clicked: true})
                render() {
                    return <a href='#' onClick={this.handleClick}>Click me</a>;
                }
            }
        }
        ```
4. **The Component API**
    - `constructor` is used to initialie state and bind methods
    - React provides a set of callbacks triggered at various points during the component's lifecycle
5. **Component Types**
    - **Functional components** are functions that take a `props` object as an argument and returns HTML
        - Lose access to component methods (which is fine because components most likely won't need them)
        - Functional components cannot have state -> stateless functional components
6. **Component Roles**
    - **Container** components (smart)
        - Handles data
    - **Presentational** components (dumb)
        - Handles UI
    - **Higher Order Components** (HoCs)
        - Components you can wrap around another component to pass it special props
        - Typically created using a higher-order component factory function


## Resources:

#### [🔗 **WebDevSimplified React Playlist**](https://www.youtube.com/watch?v=1wZoGFF_oi4&list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK)

#### [🔗 **React State and Lifecycle**](https://reactjs.org/docs/state-and-lifecycle.html)