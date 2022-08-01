# Problem Solving Patterns
[⬅ Go Back](../algos.md)

## REACTO
### **R**epeat the problem
  - Understand the problem
  - Restate the problem in own words
  - What are the inputs that go into the problem?
  - What are the outputs that come from the solution?
  - Can the outputs be determined from the inputs? (Do I have enough information to solve the problem?)
  - How to label the important pieces of data that are part of the problem
### **E**xamples
  - Start with simple examples
  - Progress to more complex examples
  - Explore edge cases / invalid inputs
### **A**pproach
  - Break it down - explicitly write out steps to take
  - Psuedocode
### **C**ode
  - Solve or simplify problem
  - Find the core difficulty in what you're trying to do
    - Temporarily ignore that difficulty
    - Write a simplified solution
    - Incorporate difficulty back in
### **O**ptimize code
  - Look back and refactor
  - Can you check the result?
  - Can you derive the result differently?
  - Can you understand it at a glance?
  - Can you use the result or method for some other problem?
  - Can you improve the performance of your solution?
  - Can you think of other ways to refactor?
  - How have other people solved this problem?

## Frequency Counters
- This pattern uses objects or sets to collect values/frequencies of values
- This can often avoid the need for nested loops of O(n^2) operations with arrays / strings

Write a function called `same`, which accepts two arays. The function should return true if every value in the array has it's corresponding value squared in the second array. The frequency of values must be the same.
  ```js
  same([1, 2, 3], [4, 1, 9]) // true
  same([1, 2, 3], [1, 9]) // false
  same([1, 2, 1], [4, 4, 1]) // false (must be same frequency)
  ```
  ```js
  // Time: O(n)
  function same(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    let freqCount1 = {}
    let freqCount2 = {}
    // loop over each array individually
    for (let val of arr1) {
      freqCount1[val] ? freqCount1[val]++ : freqCount1[val] = 1
    }
    for (let val of arr2) {
      freqCount2[val] ? freqCount2[val]++ : freqCount2[val] = 1
    }
    for (let key in freqCount1) {
      // if the squared key isn't in freqCount2, return false
      if (!(key ** 2 in freqCount2)) {
        return false
      }
      // if the squared key is in freqCount2 but the count (value) doesn't match, return false
      if (freqCount2[key ** 2] !== freqCount1[key]) {
        return false
      }
    }
    return true
  }
  ```
  - Two separate loops is better than a nested loop

Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.
  ```js
  // Time: O(n)
  function anagrams (str1, str2) {
  // if str1.length doesn't equal str2.length its false
    if (str1.length !== str2.length) return false
    // make object to hold chars
    let count = {}

    // iterate through str1 and add count of each char to object
    for (let char of str1) {
      count[char] ? count[char]++ : count[char] = 1
    }
    // iterate through arr2 and subtract count of each char from object
    for (let char of str2) {
      if (!count[char]) {
        return false
      } else {
        count[char]--
      }
    }
    return true
  }
  ```

## Multiple Pointers
- Creating pointers (or values) that correspond to an index or position and move towards the beginning, end, or middle based on a certain condition
- Very efficient for solving problems with minimal space complexity as well

Write a function called `sumZero` which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

  ```js
  sumZero([-3, -2, -1, 0, 1, 2, 3]) // [-3, 3]
  sumZero([-2, 0, 1, 3]) // undefined
  sumZero([1, 2, 3]) // undefined
  ```
  ```js
  // Time: O(n)
  // Space: O(1)

  function sumZero(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      let sum = arr[left] + arr[right];
      if (sum === 0) {
        return [arr[left], arr[right]]
      } else if (sum > 0) {
        right --;
      } else {
        left ++;
      }
    } 
  }
  ```

Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.