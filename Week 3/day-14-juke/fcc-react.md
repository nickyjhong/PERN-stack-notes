# freeCodeCamp React Notes
[⬅ Go Back](../week3.md)

- React is used to render the User Interface (UI) of web applications
- JSX is an extension of JavaScript that lets you write HTML within JavaScript
    - Anything you want to write in Javascript needs to be within `{ }`

## Notes

### Props (properties)
- defaultProps
    ```Javascript
    MyComponent.defaultProps = { location: 'NYC' }
    ```
- PropTypes - can set requirements for props
    ```Javascript
    const Items = (props) => {
        return <h1>Current Quantity of Items in Cart: { props.quantity }</h1>
    };

    Items.propTypes = { quantity: PropTypes.number.isRequired }

    Items.defaultProps = { quantity: 0 };
    ```
- `this`
    ```Javascript
    class App extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                 <div>
                    <Welcome name='bean'/>
                </div>
            );
        }
    };

    class Welcome extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                <p>Hello, <strong>{this.props.name}</strong>!</p>
                </div>
            );
        }
    };
    ```
- Unidirectional data flow
  - `MyApp` passes `name` property in `state` to child component (`Navbar`)
  - `Navbar` takes in `name: this.state.name` which is now in its props
  - `Navbar` can use the name by calling `{this.props.name}`
  ```Javascript
  class MyApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'CamperBot'
      }
    }
    render() {
      return (
        <div>
          <Navbar name={this.state.name}/>
        </div>
      );
    }
  };

  class Navbar extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
      <div>
        <h1>Hello, my name is: {this.props.name}</h1>
      </div>
      );
    }
  };
  ```
- You can also pass callbacks as props!
  ```Javascript

  ```

### Complex JSX Element
- Nested JSX must return a single element
    - Parent element wraps all other levels of nested elements
    ```Javascript
    <div>
    <p>Paragraph One</p>
    <p>Paragraph Two</p>
    <p>Paragraph Three</p>
    </div>
    ```

### Render HTML Elements to the DOM
- `ReactDOM.render(componentToRender, targetNode)`
    ```Javascript
    const JSX = (
    <div>
        <h1>Hello World</h1>
        <p>Lets render this to the DOM</p>
    </div>
    );

    ReactDOM.render(JSX, document.getElementById('challenge-node'))
    ```

### Defining a Class and Naming
- We use camelCase!
    - JSX uses `className` instead of `class`
    - `onClick`
    - `onChange`
- Any JSX element can be written with a self-closing tag, and every element must be closed

### Stateless Functional Component
- Can receive data and render it, but does not manage or track changes to that data
- Write a JavaScript function that returns either JSX or `null`
- Function name needs to start with a capital letter
```Javascript
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```
```Javascript
const MyComponent = function() {
  return(
    <div>Bean</div>
  )
}
```
- Example of props:
    - `App` component renders a child component called `Welcome`, which is a stateless functional component
    - `Welcome` can be passed a `user` property:
        ```Javascript
        <App>
            <Welcome user='Mark' />
        </App>
        ```
    - The created prop `user` is passed to the component `Welcome`
    - `Welcome` is a stateless functional component so it has access to the value like:
        ```Javascript
        const Welcome = (props) => <h1>Hello, {props.user}!</h1>
        ```

```Javascript
const CurrentDate = (props) => {
  return (
    <div>
      { /* Change code below this line */ }
      <p>The current date is: {props.date}</p>
      { /* Change code above this line */ }
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        <CurrentDate date={ Date() }/>
      </div>
    );
  }
};
```

### Class Component
- Extend `React.Component` so the class has access to React features, such as local state and lifecycle hooks
```Javascript
class Kitten extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Hi</h1>
        );
    }
}
```

#### Composition
- Custom HTML tag can reference another component (a component name wrapped in `< />`), it renders the markup for that component in the location of the tag

```Javascript
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
          <ChildComponent />
      </div>
    );
  }
};
```
```Javascript
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
        <TypesOfFruit />
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        <Fruits />
      </div>
    );
  }
};
```

### State
```Javascript
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'bean'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.firstName}</h1>
      </div>
    );
  }
};
```
- If a component is stateful, it will always have access to the data in `state` in its `render()` method
- If you make a component stateful, no other components are aware of its `state`
  - `state` is encapsulated/local to that component, unless you pass state data to a child component as `props`
- `this.setState()` takes an object with key-value pairs
  - Don't modify `state` directly!
  ```Javascript
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'Initial State'
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({name: 'React Rocks!'})
    }
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Click Me</button>
          <h1>{this.state.name}</h1>
        </div>
      );
    }
  };
  ```
- You can use `state` to toggle an element!
  - Pass `setState` a function that allows you to access state and props
    ```Javascript
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
    ```
  - You can also use form without `props` if you only need the `state`
    ```Javascript
    this.setState(state => ({
      counter: state.counter + 1
    }))
    ```

    ```Javascript
    this.state = {
      visibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this)
    ...
    toggleVisibility() {
    this.setState((state) => ({
      visibility: !state.visibility
    }));
    ```
- Controlled input
  ```Javascript
  class ControlledInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: ''
      };
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
      this.setState((state) => ({
        input: event.target.value
      }))
    }
    render() {
      return (
        <div>
          <input value={this.state.input} onChange={this.handleChange}></input>
          <h4>Controlled Input:</h4>
          <p>{this.state.input}</p>
        </div>
      );
    }
  };
  ```
### Lifecycle Methods

#### componentWillMount()
- **Will be deprecated in 16.X and removed in 17**
- Called before `render()` when a component is being mounted to the DOM

#### componentDidMount()
- Used to call an API endpoint to retrieve data
- Called after a component is mounted to the DOM
- Any calls to `setState()` here will trigger a re-rendering of component
- Best place to add event listeners, such as `onClick()`

#### shouldComponentUpdate()
- Takes `nextProps` and `nextState` as parameters
- Used to optimize performance

### Conditionals
- Use `&&` for a more concise conditional!
  - If `condition` is true, the markup will be returned
  - If `condition` is false, the operation will return `false` and return nothing
  ```Javascript
  {condition && <p>markup</p>}
  ```
- Ternary operator
  ```Javascript
  condition ? expressionIfTrue : expressionIfFalse;
  ```
  - `if/else` statements can't be inserted directly into JSX code

- Use props to conditionally render code - use the value of a given prop to automatically make decisions about what to render

### Array.map()
- Render an unknown number of elements
- All chil elements created by a map need to have a unique `key` attribute
  ```Javascript
  const textAreaStyles = {
    width: 235,
    margin: 5
  };

  class MyToDoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userInput: '',
        toDoList: []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit() {
      const itemsArray = this.state.userInput.split(',');
      this.setState({
        toDoList: itemsArray
      });
    }
    handleChange(e) {
      this.setState({
        userInput: e.target.value
      });
    }
    render() {
      const items = this.state.toDoList.map(todo => 
      <li key={todo}>{todo}</li>
      ); 
      return (
        <div>
          <textarea
            onChange={this.handleChange}
            value={this.state.userInput}
            style={textAreaStyles}
            placeholder='Separate Items With Commas'
          />
          <br />
          <button onClick={this.handleSubmit}>Create List</button>
          <h1>My "To Do" List:</h1>
          <ul>{items}</ul>
        </div>
      );
    }
  }
  ```
### Array.filter()
- Can be used to filter by what's in `state`
  - Array of users that all have a property `online` which can be set to `true` or `false` -> filter only the users that are online
    ```Javascript
    let onlineUsers = users.filter(user => user.online)
    ```

  ```Javascript
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: [
          {
            username: 'Jeff',
            online: true
          },
          {
            username: 'Alan',
            online: false
          },
          {
            username: 'Mary',
            online: true
          },
          {
            username: 'Jim',
            online: false
          },
          {
            username: 'Sara',
            online: true
          },
          {
            username: 'Laura',
            online: true
          }
        ]
      };
    }
    render() {
      const usersOnline = this.state.users.filter(user => user.online === true); 
      const renderOnline = usersOnline.map(user => 
      <li key={user.username}>{user.username}</li>);
      return (
        <div>
          <h1>Current Online Users:</h1>
          <ul>{renderOnline}</ul>
        </div>
      );
    }
  }
  ```

### renderToString()
- Use to render a React component on the server
- Without doing this, React apps would consist of a relatively empty HTML file and a large bundle of JavaScript when initially loaded to the browser
- This creates a faster initial page load experience because the rendered HTML is smaller than the JavaScript code of the entire app
```Javascript
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};

ReactDOMServer.renderToString(<App />)
```