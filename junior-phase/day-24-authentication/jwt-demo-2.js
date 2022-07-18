// npm init
// npm i jsonwebtoken

const jwt = require('jsonwebtoken');
const thingToStore = {
  userId: 1234
}

const token = jwt.sign(thingToStore, process.env.JWT)

console.log('Your token is', token) // Your token is long-jumbled-string

const thingThatWasStored = jwt.verify(token, process.env.JWT)
// in terminal: 
// export JWT=SuperSecret
// npm run start
// or: JWT=SuperSecret node jwt-demo-2.js

console.log('Your data inside the token is', thingThatWasStored)
// Your data inside the token is {userId: 1234, iat: timestamp-when-it-was-stored}