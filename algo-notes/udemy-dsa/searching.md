# Searching Algorithms
[⬅ Go Back](../algos.md)

This function accepts an array and a value. 
Check if the current array element is equal to the value
If it is, return the index at which the element is found.
If the value is never found, return -1

## Linear Search
- Visit one item at a time (set interval)
  - .indexOf
  - .includes
  - .find
  - .findIndex
- Best case: O(1)
- Average and worst case: O(n)

  ```js
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