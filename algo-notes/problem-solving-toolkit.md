# Stacks, Queues, and Linked Lists
[⬅ Go Back](./algos.md)

## Stacks
- Abstract Data Type (ADT)
- Use array for storage
- Follows LIFO/FILO
- Methods:
  - .push()
  - .pop()

### When to use
- Direct implementation questions
- Depth-first search (DFS) of trees/matrices/graphs
- Iterative implementation of recursive algorithms
- Evaluating arithmetic expressions: postfix, prefix, infix notation
- Sneak-attach implementations (iterative-ish backtracking)
  - Problems that deal with elements closest to the current element
  - Involves recognizing that the current element needs information about the elements before it, but once it is used, it can be ignored
    - Creates the idea of "popping" off the stack

#### Leetcode:
[151. Reverse words in a string](https://leetcode.com/problems/reverse-words-in-a-string/)

## Queues
- Abstract Data Type (ADT)
- Use array for storage
- Follows FIFO/LILO
- Methods:
  - .shift()
  - .push()

### When to use
- Direct implementation questions
- Breadth-first search (BFS) or traversal of trees/matrices/graphs
  - Don't want to deal with it now, but will need to deal with it later
  - Waiting to complete something so you queue it up
  - Usually a sidekick to the full operation, not something you are actively using in your calculations
- Caches (LRU Cache)
#### Leetcode:
[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
  - Look at root
  - Put both children in queue
  ```js
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }

  // BFS
  const levelOrder = function(root) {
    if(!root) return []
    const queue = []
    const output = []

    queue.push(root)
    while(queue.length) {
      // Remove all the current nodes in the queue and add each node's children to the queue
      const len = queue.length
      const row = []
      for(let i = 0; i < len; i++) {
        const cur = queue.shift()
        if(cur.left) queue.push(cur.left)
        if(cur.right) queue.push(cur.right)
        // Push the current node val to the row array
        row.push(cur.val)
      }
      // Push the current row array into the output array
      output.push(row)
    }
    return output
  };

  // to enqueue in JS using an array: arr.push()
  // to dequeue in JS using an array: arr.shift()
  ```
  - [Solution 1](https://dev.to/cod3pineapple/102-binary-tree-level-order-traversal-javascript-solution-3ejj)
  - [Solution 2](https://dev.to/samuelhinchliffe/102-binary-tree-level-order-traversal-2oh5)
## Linked Lists
- Data structure used for list, stack, queue ADTS, etc.
- Uses nodes which encapsulate a value and pointer(s)
- Main entity holds reference(s) to just a **head** and/or **tail** node
- Each node then points to the **next** and/or **previous** value
### When to use
- Direct implementation part 1:
  - Implementation for stacks/queues storage
  - Build linked lists from scratch, or build new nodes
  - 
- 
#### Leetcode: