# Props and State
[⬅ Go Back](../week3.md)

- Separate by components

## Notes
- Two ways to write components

### **Class** - has access to components
- May be stateful (constructor with `this.state`)
    - **IF YOU NEED STATE, YOU MUST USE CLASS**
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