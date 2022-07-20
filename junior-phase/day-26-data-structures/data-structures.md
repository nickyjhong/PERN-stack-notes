# Data Structures
[⬅ Go Back](/week6.md)

## Notes
- Most important to know:
  - When to use a given data structure
  - What is its time and space complexity
  - How does it work (in one sentence)
![big o cheatsheet](/images/big-o-cheatsheet.png)
### Stacks and Queues
- Stacks
  - Collection of ordered elements that can repeat (not a set)
    - "push" - adds an element to the stack
    - "pop" - retrieve element from list (last in, first out)
    - "peek" - look at top element without removing it
  - Since arrays have the push() and pop() already implemented you generally don't create your own stack class like Dax is doing.  He's doing this to be very explicit to show you just the stack-only parts:
    ```Javascript
    class Stack {
      constructor() {
        this.arr = [];
        this.size = 0;
      }
      push(value) {
        // first empty item
        this.arr[this.size] = value;
        this.size++;
      }
      pop() {
        // get the item
        const value = this.arr[this.size - 1];
        // remove it
        this.size--;
        // return the item we got
        return value;
      }
      peek() {
        return this.arr[this.size - 1];
      }
      print() {
        for (let i = this.size - 1; i >= 0; i--) {
          console.log(`At position ${i} value: ${this.arr[i]}`)
        }
      }
    }
    ```
    - Push
    ![Stack push](/images/stack-push.png)
  - Queues
  
  
### Linked List
- Like a chain
- Uses "nodes" which encapsulates a value and pointer(s) to the next/previous node
  - Completely different from Node.js 
  - These nodes are a part of a linked list (each link in the chain)

![linked list 1](/images/linked-list-1.png)
  - Omri is the head (first node)
  - Omri is linked to Ayana
  - Ayana is the tail (last node) and has no next node 

![linked list 2](/images/linked-list-2.png)
  - Gabriel is linked to Omri and Ayana in O(1) time
  - Gabriel has a pointer on both ends (Omri, Ayana)
  - Need to check Omri and Gabriel before you can check Ayana!

![linked list 3](/images/linked-list-3.png)

```Javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
  setNext(next) {
    this.next = next;
  }

  clearNext(next) {
    this.next = null;
  }
}


class LinkedList {
  constructor(firstValue) {
    this.head = new Node(firstValue);
  }
  addValueToEnd(node) {
    let currentNode = this.head;

    // last node's currentNode.next would be null 
    while(currentNode.next !== null) {
      currentNode = currentNode.next;

      console.log('At node', currentNode.value);
    }
    currentNode.next = new Node(value);
    console.log('And next node of', currentNode.value, 'is', currentNode.next.value);
    currentNode.next.value;
  }
}
```
![linked list 4](/images/linked-list-4.png)