# Props and State
[⬅ Go Back](/week3.md)

- Separate by components

## Notes
- Two ways to write components

### **Class** - has access to components
- May be stateful (constructor with `this.state`)
    - **IF YOU NEED STATE, YOU MUST USE CLASSES** (unless you use hooks)
- Must have render()
- May have additional methods
- Accesses props passed to it via `this` context (`this.props`)

```Javascript
class Pizza extends React.Component {
    render() {
        return <div>Pizza Pie!</div>
    }
}
```

### **Function**
- Simple
- Easy to re-use and test
- No state, no additional methods or functionality
- Function's return is the `"render"`
- Accesses props passed to it via the first argument to the function (`const Topping = (props) => {...}`)
- Write lots of functional components and not as many classes!
```Javascript
const Pizza = () => {
    return <div>Pizza Pie! </div>
}
```

### Props
- Keep our code DRY
    ```Javascript
    <ToppingList>
        <Topping type="cheese"/>
        <Topping type="broccoli"/>
        <Topping type="anchovies"/>
    </ToppingList>

    // props are all of the attributes on this Topping component
    const Topping = (props) => {
        return <li>{props.type}</li>
    }
    ```
- All props that are passed into a component become key-value pairs on the component's "props" object
- Props can be passed down (parent -> child)
    - Sending state through props
    - Cannot be passed up (child -> parent)

### Adding/removing a class
- In this example, we're adding a border to whichever color is selected
- We do this by adding and removing the `selected` CSS class

1. `isSelected` returns a boolean after checking if the `props.selectedColor` is the same as the `props.color`
2. `myClassName` **adds** the class `isSelected` to whichever color we clicked (now we have 2 class names)
    - If `isSelected` is false, the `selected` class is NOT added
3. In `<Color/>` (in `render()`) add `selectedColor={this.state.selectedColor}` as a class

```Javascript
import React from 'react';
import ReactDOM from 'react-dom';

// write your Color component here
const Color = (props) => {
  const color = props.color;
  const selectColor = props.selectColor;
  const isSelected = props.selectedColor === props.color;

  let myClassName = color + (isSelected ? ' selected' : '');

  return (
    <div className={myClassName} onClick={() => selectColor(color)}/>
  )
}

class Picker extends React.Component {
  constructor() {
    super()
    this.state = {selectedColor: 'red'}
    this.selectColor = this.selectColor.bind(this)
  }
  selectColor (colorName) {
    this.setState({selectedColor: colorName})
  }
  render() {
    return (
      <div id="container">
        <div id="navbar">
          <div>Currently selected: </div>
          <div className={this.state.selectedColor}>{this.state.selectedColor}</div>
        </div>
        <div id="colors-list">
          <Color color='red' selectColor={this.selectColor} selectedColor={this.state.selectedColor}/>
          <Color color='blue' selectColor={this.selectColor} selectedColor={this.state.selectedColor}/>
          <Color color='green' selectColor={this.selectColor} selectedColor={this.state.selectedColor}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Picker />,
  document.getElementById('app')
);
```