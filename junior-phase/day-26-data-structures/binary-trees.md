# Binary Trees
[⬅ Go Back](/week6.md)


![binary 1](/images/tree-adt.png)
## Notes
- Nodes contain value(s)
- Has a primary "root" node
- Children are subtrees (recursive!)
  - No duplicated children (cycles)
  - Trees can branch but never converge
  - Every node is the root of a tree - a node represents a tree
- Final nodes are called "leaves"
- Use binary search tree when you want sorted data that is changing all the time

![binary 2](/images/binary-tree-2.png)
- Sorted in alphabetical order
  - Everything on the left comes BEFORE K
  - Everything on the right comes AFTER K

![binary 3](/images/binary-tree-3.png)
- Start at 15
![binary 4](/images/binary-tree-4.png)
- 28 is > 15 so go to the right side
![binary 5](/images/binary-tree-5.png)
- 28 is > 18 so go to the right side
![binary 6](/images/binary-tree-6.png)
- 28 is < 50 so go to the left side
![binary 7](/images/binary-tree-7.png)
- Found 28
![binary 8](/images/binary-tree-8.png)

- Be consistent on ordering principles
  - Left descendants < root value
  - Right descendants >= root value 

### Traversal
#### Breadth-First
- Most useful when levels have some meaning
  - Right answer is close to root
- Not used as often
![binary 9](/images/binary-tree-9.png)

#### Depth-First
- Pre-Order(nlr)
  - Node => Left => Right
    1. Visit the node
    2. Check for left node
    3. Check for right node

  ![binary 10](/images/pre-order-tree.png)
- In-Order(lnr)
  - Left => Node => Right
    1. From given/current node, check for left child

    2.  (If no left child) visit node
    <br>
        (If yes left child) repeat from step 1
    3.  Check for right child
    4. Repeat from step 1
  
  ![binary 11](/images/in-order-tree.png)

- Post-Order(lrn)
  - Left => Right => Node
    1. Start from current node: is there a left node?
    2. Yes? Check if that one has a left node. If yes, keep going until theres no left node
    3. No left node - is there a right node? No? Visit the node
    4. Backtrack and look for right node. 
    5. Repeat from step 1 (yay recursion :/)


<br>

```Javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value);
  }
  add(value) {
    this.addToNode(value, this.root);
  }
  addToNode(value, node) {
    if (value < node.value) {
      if (node.left === null) {
        // no node on left yet
        node.left = new Node(value);
      } else {
        // we already have a node to the left, but we need to put our value somewhere over there!
        this.addToNode(value, node.left)
    } else {
      if (node.right === null) {
        // no node on the right yet
        node.right = new Node(value);
      } else {
        this.addToNode(value, node.right);
      }
    }
  }
}
```