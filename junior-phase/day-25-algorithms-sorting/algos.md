# Algorithms
[⬅ Go Back](/week6.md)

## Notes
![Time complexities](/images/time-complexities.png)

### Big O
- Upper bound (ceiling) for how many steps an algorithm could take to run
- Depending on some characteristic(s) of the input(s) - size
- Typically assumes worst case

#### O(1) - Constant
- The time (iterations) is constant regardless of the complexity
```Javascript
const getLast = (items) => {
  return items[items.length - 1];
};
```

#### O(n) - Linear
- Worst case time (iterations) grows on par with the number of items
  - For N elements, we require up to a multiple of N steps
```Javascript
const findIndex = (items, match) => {
   for (let i=0, total=items.length; i < total; i++)
      if (items[i] == match)
         return i;
   return -1;
};

// Example cases:

const array = ["a","b","c","d"];

console.log(findIndex(array,"a")); // 0  (1 iteration - best case)
console.log(findIndex(array,"d")); // 3  (4 iterations - worst case)
console.log(findIndex(array,"e")); // -1 (4 iterations - worst case)
```

#### O(log n) - Logarithmic
- Inverse of exponentiation
- Decrease the amount of work (roughly by half) with each step
```Javascript
//You decrease the amount of work you have to do with each step

function thisOld(num, array){
  let midPoint = Math.floor( array.length / 2 );
  if( array[midPoint] === num) {
    return true;
  }
  else if( array.length <= 1  ) {
    return false;
  }
  else if( array[midPoint] > num) {
    return thisOld(num, array.slice(0, midPoint));
  }
  else if( array[midPoint] < num ) {
    return thisOld(num, array.slice(midPoint));
  }
}

// Example cases:
const sortedAges = [15, 20, 29, 35, 40];

thisOld(29, sortedAges) // returns true

/*
 * Notes
 *
 * This solution works because our Array is sorted.
 *
 * Recursive solutions are often logarithmic
 *
 */
```

#### O(n^2) -  Quadratic
- Worst case time (iterations) is the square of the number of inputs
  - Time grows exponentially related to the number of inputs
```Javascript
const buildSquareMatrix = (items) => {
   let matrix= [];
   for (let i=0, total=items.length; i < total; i++){ 
      matrix[i] = [];
      for (let j=0, total=items.length; j < total; j++)
         matrix[i].push(items[j]);
   }
   return matrix;
};

buildSquareMatrix(["a","b","c"]);
// [
//   ["a","b","c"],
//   ["a","b","c"],
//   ["a","b","c"]
// ] (9 iterations for 3 elements)
```