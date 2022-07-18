// npm init
// npm i jsonwebtoken

const jwt = require('jsonwebtoken');
const thingToStore = {
  userId: 1234
}

const token = jwt.sign(thingToStore, "SuperSecret")

console.log('Your token is', token) // Your token is long-jumbled-string

const thingThatWasStored = jwt.verify(token, 'SuperSecret')

console.log('Your data inside the token is', thingThatWasStored)
// Your data inside the token is {userId: 1234, iat: timestamp-when-it-was-stored}