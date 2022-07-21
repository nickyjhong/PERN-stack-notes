# Hash Tables
[⬅ Go Back](/week6.md)

## Notes
- AKA Associative Array, Map
- Works more or less the same as Javascript objects
- Stores key-value pairs ("location": "NY")
  - Unique keys
- Key is what goes through a hash function
  - Primary key in SQL database is same as key in hash table

![hash 3](/images/hash-3.jpg)
- Commonly use a Hash Table because of its fast search, insertion, and delete operations
![hash 4](/images/hash-4.png)

- High-concept: an _array_ to hold values, and a _hash function_ that transforms a string key into a numerical index

```js
// This is not a full Hash Table
// This is part of what the code inside would look like

const friends = new Array(1000)

const addContact = (phoneNumber, name) => {
  // gets last 3 digits of phone number
  // phoneNumber % 1000 is a HASH FUNCTION
  friends[phoneNumber % 1000] = name;
}

const getContact = (phoneNumber) => {
  return friends[phoneNumber % 1000]
}
```
```js
function hash(keyString) {
  let hashed = 0;
  for (let i = 0; i < keyString.length; i++) {
    hashed += keyString.charCodeAt(i);
  }
  return hashed % 7; // number of spaces in array; between 0 and 999
}
...
// EXAMPLE IN TERMINAL

let keyString = "NAME"
let hashed = 0;
// for loop goes through every letter in keyString
// for each character, something gets added to hashed
// put in INDEX in charCodeAt()
hashed += keyString.charCodeAt(0) // 78
hashed += keyString.charCodeAt(1) // 143
hashed += keyString.charCodeAt(2) // 220
hashed += keyString.charCodeAt(3) // 289
// returns number between 0 and 6
hashed % 7 // 2
```
- In this example, you need a separate hash table for every single person
![hash 1](/images/hash-1.png)
![hash 2](/images/hash-2.png)

### UNDER DA HOOD
Inventory using JS Object
```js
let objInv = {};
objInv['apple'] = 10;
objInv['arrow'] = 30;
objInv['sword'] = 1;

objInv // { apple: 10, arrow: 30, sword: 1 }
objInv['arrow'] // 30
```

Inventory using JS Map
```js
let mapInv = new Map();
mapInv.set('apple', 10)
mapInv.set('arrows', 30)
mapInv.set('sword', 1)

mapInv // Map(3) { 'apple' => 10, 'arrow' => 30, 'sword' => 1 }
mapInv.get('arrow') // 30
```