# freeCodeCamp React Notes
[⬅ Go Back](../week3.md)

- React is used to render the User Interface (UI) of web applications
- JSX is an extension of JavaScript that lets you write HTML within JavaScript
    - Anything you want to write in Javascript needs to be within `{ }`
- `props` (properties)

## Notes

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
return (
 <App>
  <Navbar />
  <Dashboard />
  <Footer />
 </App>
)
```
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