# Singly Linked Lists
[⬅ Go Back](../algos.md)

## What is a Singly Linked List?
- A data structure that contains a **head**, **tail**, and **length** property
- Consists of nodes
  - Each **node** has a **value** and **pointer** to another node or null
- Linked lists don't have indices (arrays do)
  - Need to start at HEAD (Singly Linked Lists only go in one direction)
    - **next** pointer
  - Random access is not allowed
- Excellent alternative to arrays when insertion and deletion at the beginning are frequently required (Big O time)
- The idea of a list data structure that consists of nodes is the foundation for other data structures like Stacks and Queues

## Big O
- Insertion - O(1)
- Removal - ...depends
  - .shift - O(1)
  - .pop - O(n)
- Searching - O(n)
- Access - O(n)

## Singly Linked List
- Make a class called `Node` to be used in `SinglyLinkedList` class
- Make instance methods for `SinglyLinkedList`
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val)
    if (!this.null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current; 
    
    while(current.next) {
      newTail = current;
      current = current.next
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return undefined
    let current = this.head;
    this.head = current.next;
    this.length --
    if (this.length === 0) {
      this.tail = null;
    }
    return current;
  }
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let count = 0;
    let current = this.head
    while (count !== index) {
      current = current.next;
      count++
    }
    return current;
  }
  set(val, index) {
    let node = this.get(index);
    if (node) {
      node.val = val;
      return true
    }
    return false 
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return false
    if (index === this.length) return !!this.push(val)
    if (index === 0) return !!this.unshift(val)

    let newNode = new Node(val);
    let prev = this.get(index - 1);
    let temp = prev.next;

    prev.next = newNode;
    newNode.next = temp;
    this.length++
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined
    if (index === this.length - 1) this.pop()
    if (index === 0) return this.shift()

    let prev = this.get(index - 1)
    let removed = prev.next
    prev.next = removed.next;
    this.length--
    return this.removed
  }
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
}
```

### Push - ADD TO END
- Function should accept a value
- Create a new node using the value passed to the function
- If there is no head property on the list, set the head and the tail to be the newly created node
- Otherwise, set the next property on the tail to be the new node and set the tail property on the list to be the newly created node
- Increment the length by one
- Return the linked list
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val)
    if (!this.null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
}

let list = new SinglyLinkedList()
list.push('HELLO')
list.push('GOODBYE')

// BAD WAY OF REPRESENTING LINKED LIST! Need to keep adding .next
// let first = new Node('Hi')
// first.next = new Node('there')
// first.next.next = new Node('buddy')
```

### Pop - REMOVE FROM END
- Function does not accept a value
- If there are no nodes in the list, return undefined
- Loop through the list until you reach the tail
- Set the next property of the 2nd to last node to be null (need to keep track of previous variable too)
- Set the tail to be the 2nd to last node
- Decrement the length of the list by 1
- Return the value of the node removed
```js 
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current; 
    
    while(current.next) {
      newTail = current;
      current = current.next
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--
    // the following can be refactored later using another function
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
}
```

### Shift - REMOVE FROM BEGINNING
- Function does not accept a value
- If there are no nodes, return undefined
- Store the current head property in a variable
- Set the head property to be the current head's next property
- Decrement the length by 1
- Return the value of the node removed
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  shift() {
    if (!this.head) return undefined
    let current = this.head;
    this.head = current.next;
    this.length --
    if (this.length === 0) {
      this.tail = null;
    }
    return current;
  }
}
```

### Unshift - ADD TO BEGINNING
- Function should accept a value
- Create a new node using the value passed to the function
- If there is no head property on the list, set the head and tail to be the newly created node
- Otherwise, set the newly created node's next property to be the current head property on the list
- Set the head property on the list to be that newly created node
- Increment the length of the list by 1
- Return the linked list
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
      this.length++
      return this;
  }
}
```

### Get - RETRIEVE NODE BASED ON POSITION IN LINKED LIST
- Function should accept an index
  - This index is not like an index in array - need to manually find
- If the index is less than zero or greater than or equal to the length of the list, return null
- Loop through the list until you reach the index and return the node at that specific index
- Return the value at the index
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let count = 0;
    let current = this.head
    while (count !== index) {
      current = current.next;
      count++
    }
    return current;
  }
}
```

### Set - CHANGE VALUE OF NODE BASED ON POSITION IN LINKED LIST
- Function should accept a value and an index
- Use your **get** function to find the specific node
- If the node is not found, return false
- If the node is found, set the value of that node to be the value passed to the function and return true
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  set(val, index) {
    let node = this.get(index);
    if (node) {
      node.val = val;
      return true
    }
    return false 
  }
}
```

### Insert - ADD NODE AT SPECIFIC POSITION
- Function should accept a value and an index
- If the index is less than zero or greater than the length, return false
- If the index is the same as the length, **push** a new node to the end of the list
- If the index is 0, **unshift** a new node to the start of the list
- Otherwise, using the **get** method, access the node at the index - 1 (minus 1 not negative 1)
- Set the next property on that node to be the new node
- Set the next property on the new node to be the previous node
- Increment the length
- Return true
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return false
    // double ! negates whatever is returned - turns into boolean
    if (index === this.length) return !!this.push(val)
    if (index === 0) return !!this.unshift(val)

    let newNode = new Node(val);
    let prev = this.get(index - 1);
    let temp = prev.next;

    prev.next = newNode;
    newNode.next = temp;
    this.length++
    return true;
  }
}
```

### Remove - DELETE NODE AT SPECIFIC POSITION
- Function should accept an index
- If the index is less than zero or greater than or equal to the length, return undefined
- If the index is the same as the length - 1, use **pop**
- If the index is 0, use **shift**
- Otherwise, using the **get** method, access the node at the index - 1
- Set the next property on that node to be the next of the next node
- Decrement the value
- Return the value of the node removed
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined
    if (index === this.length - 1) this.pop()
    if (index === 0) return this.shift()

    // get the index before the index being removed
    let prev = this.get(index - 1)
    // prev.next is the index being removed
    let removed = prev.next
    // index - 1's new .next is going to be what was removed's next 
    prev.next = removed.next;
    this.length--
    return this.removed
  }
}
```

### Reverse - REVERSE THE LINKED LIST IN PLACE
- Don't make a copy!
- Function does not accept a value
- Swap the head and tail
- Create a variable called next
- Create a variable called prev
- Create a variable called node and initialize it to the head property
- Loop through the list
- Set next to be the next property on whatever node is
- Set the next property on the node to be whatever prev is
- Set prev to be the value of the node variable
- Set the node variable to be the value of the next variable
```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  reverse() {
    // temporary variable
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    // need tail to be null
    let prev = null;
    let next = null;
    // can also use while loop
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
}
```