# Object Oriented Programming Design
[⬅ Go Back](/README.md)

## Notes
- JavaScript uses OOP and Functional programming
  - Prototypal inheritance and prototype chain
  - Has class syntax but is just syntactic sugar on top of the prototype chain
  - Privacy "does not exist traditionally" in JavaScript
  - Focuses on mapping "real world objects" to programs

### Encapsulation
- The idea that we bundle data and methods together that work on that data
- Information hiding: We want to keep data/properties invisible to outside objects to prevent data tampering. This way, we can create methods that giev only read access to our data
- Removes access to parts of code and makes things private
```js
class Cart {
  constructor() {
    this.products = []
  }
  addItem(product) {
    // If product is a product object then add it
    // else throw error
    this.products.push(product)
  }
}

let myCart = new Cart();

// Encapsulation - keep certain traits private vs public
myCart.products = [1] // NOT ALLOWED IN TRADITIONAL OOP
myCart.addItem(1) // Exposed methods to edit internal variables
```

### Abstraction
- Result of encapsulation
- Meant to hide everything but the relevant pieces/data about an object
- Complex or unnecessary details are hidden / show essentials
```js
class MyComponent extends React.Component {
  constructor(super) {
    super()
  }
}

// Abstraction - You don't need to know HOW a function works in order to use it
// Code is abstracted from user
```

### Inheritance
- The idea that we can derive classes from other classes to create a hierarchy of classes that share a set of properties and methods
- Eliminates redundant code
```js
class Animal {
  constructor(name) {
    this.name = name
  }
  walk() {
    // animal walks
  }
}

class Dog extends Animal {
  constructor (name, breed) {
    super(name)
    this.breed = breed;
  }
  fetch() {
    // animal fetches
  }
}

// Inheritance - Extended class has access to properties and methods from parent class
```

#### Composition Sidebar
- The idea to combine (compose) objects to make larger, more complex objects

### Polymorphism
- Ability of an object to take on many forms