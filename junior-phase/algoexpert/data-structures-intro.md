# Intro to Data Structures and Complexity
[⬅ Go Back](/week6.md)

## Notes
- Data structures are just concepts to know for coding interviews
- A way to organize and manage data
- A collection of data values, the relationships among them, and the functions or operations that can be applied to the data

### Complexity Analysis
- **Complexity analysis** - the process of determining how efficient an algorithm is
  - Take into account **time** and **space**
- **Time complexity**: how fast an algorithm runs - how many operations are executed per input
- **Space complexity**: how much memory an algorithm takes up

### Big O Notation
- Fastest to slowest:
  - **Constant**: O(1)
    - For all inputs to our algorithm there is and will always be only one operation required
      - Order 1
      - Constant Time
    - No matter how many inputs we add, space and time complexity does NOT change
    ```js
    const nums = [1, 2, 3, 4, 5]
    const firstNumber = nums[0]
    ```
  - **Logarithmic**: O(log(n))
    - As you loop your operations are halved!!

  - **Linear**: O(n)
    - For all inputs to our algorithm there will be one operation per input
      - Order n
      - Linear
      - Linear scaling
    - A simple loop!!
    ```js
    const nums = [1, 2, 3, 4, 5]
    let sum = 0
    for (let num of nums) {
      sum += num
    }
    ```
  - **Log-linear**: O(nlog(n))
  - **Quadratic**: O(n^2)
    - Iteration with a callback that repeats itself (has to do operation twice)
    - Loop in a loop
    ```js
    const hasDuplicates = function(num) {
      for (let i = 0; i < nums.length; i++) {
        const thisNum = nums[i]
        for (let j = 0; j < nums.length; j++) {
          if (j !== i) {
            const otherNum = nums[j]
          }
        }
        if (otherNum === thisNum) return true
      }
      return false
    }
    const nums = [1, 2, 3, 4, 5, 5]
    hasDuplicates(num) // true
    ```
  - **Cubic**: O(n^3)
  - **Exponential**: O(2^n)
  - **Factorial**: O(n!)
- O(1) vs O(n)
  - Summing function for a sorted, contiguous array of integers that starts with the number 1? Could easily be O(n) but...
  ```js
  const sumContiguousArray = function(arr) {
    const lastItem = arr[arr.length - 1]
    return lastItem * (lastItem + 1) / 2
  }
  const nums = [1, 2, 3, 4, 5]
  const sumOfArray = sumContiguousArray(nums)
  ```