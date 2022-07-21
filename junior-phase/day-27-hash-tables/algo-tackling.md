# Algorithm Tackling
[⬅ Go Back](/week6.md)

## Notes
- Many major tech companies favor white-boarding algorithms over writing actual code
  - Communication ability >= implicit knowledge

- Solving algorithmically
  - Break down the problem into smaller problems
- Time and space complexity (Big O difference)
- Anything you do with loops you can do with recursion
- Anything you do with recursion you can do with loops

### Good use cases for:
- Hash tables (JS Objects)
  - Want to instantly grab specific information
  - Can also insert very easily
  - Example: Dictionary
- Linked list
  - Quick insertion and deletions from beginning and end
  - Stacks and Queues
- Binary search trees
  - Sorted data that's more efficient to search/add/delete
    - Keeps sorted data in order

### Big O
- Big O refers to an upper bound (worst case scenario)
- Complexity of algorithm -> TIME and SPACE
- Not necessarily relevant for small input sizes
#### How to calculate it
- Count the steps
  - Any time you hit a loop, multiply the numbero f times we iterate by the max complexity of each loop iteration
    - Stuff inside loop (muliplies)
    - Nested loops (multiply)
    - Sibling loops (add)
- Drop the constants
- Drop less signification terms

#### Common Runtimes
- O(1) - constant
- O(log n) - logarthmic complexity
- O(n) - linear
- O(n * log n) - log-linear
- O(n^2) - quadratic
- O(n^3), O(n^2), O(n^4) - polynomial
- O(1.6^n), O(2^n) - exponential complexity
- O(n!) - factorial (traveling salesman)

#### Space Complexity
- Really: memory
- Process is similar to deriving time complexity, except you count the space
- Things to look for:
  - Recursive calls
  - Size of iteratbles (strings, arrays, linked-lists, etc)
  - New data structures created
  

### REACTO
**R**epeat the question in your own words
<br>
**E**xamples (inputs and outputs)
<br>
**A**pproach (plan and communicate - articulate)
<br>
**C**ode out the solution
<br>
**T**est code
<br>
**O**ptimze code (DRY)
<br>