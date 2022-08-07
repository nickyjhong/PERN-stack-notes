# Searching Algorithms
[⬅ Go Back](../algos.md)



## Linear Search
- Visit one item at a time (set interval)
  - .indexOf
  - .includes
  - .find
  - .findIndex
- Best case: O(1)
- Average and worst case: O(n)

  ```js
  <!-- This function accepts an array and a value. 
  Check if the current array element is equal to the value
  If it is, return the index at which the element is found.
  If the value is never found, return -1 -->

  // Time: O(n)
  function linearSearch(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return i
      }
    } return -1
  }
  ```
## Binary Search
- **ONLY WORKS ON SORTED ARRAYS**
- Much faster form of search
- Eliminate half of the reamining elements at a time
- Best case: O(1)
- Average and worst case: O(log n)

#### Binary Seach Pseudocode
  - This function accepts a sorted array and value
  - create a left pointer at the start of the array, and a right pointer at the end of the array
  - While the left pointer comes before the right pointer: 
    - Create a pointer in the middle
    - If you find the value you want, return the index
    - If the value is too small, move the left pointer up
    - If the value is too large, move the right pointer down
  - If you never find the value, return -1
  ```js
  <!-- This function accepts an array and a value. 
  Check if the current array element is equal to the value
  If it is, return the index at which the element is found.
  If the value is never found, return -1 -->

  // Time: O(log n)
  function binarySearch(arr, val) {
    let left = 0
    let right = arr.length - 1
    let middle = Math.floor((left + right) / 2)
    while (arr[middle] !== val && left <= right) {
      if (val < arr[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
      middle = Math.floor((left + right ) / 2);
    }
    return arr[middle] === val ? middle : -1;
  }
  ```

## Naive String Search
- Most basic/common way of searching for a substring in a longer string
#### Naive String Seach Pseudocode
  - Loop over the longer string
  - Loop over the shorter string
  - If the characters don't match, break out of the inner loop
  - If the characters do match, keep going
  - If you complete the inner loop and find a match, increment the count of matches
  - Return the count
  ```js
  function naiveSearch(long, short) {
    let count = 0;
    for (let i = 0; i < long.length; i++) {
      for (let j = 0; j < short.length; j++) {
        if (short[j] !== long[i+j]) {
          break;
        }
        if (j === short.length - 1) {
          count++
        }
      }
      return count;
    }
  }
  ```