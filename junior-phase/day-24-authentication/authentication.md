# JSON Web Tokens (JWT) / Authorization
[⬅ Go Back](/week6.md)

## Notes
### Authentication Flow
- User inputs credentials (username and password)
- Server receives credentials, verifies user, and sends back a token
- Future requests from the client include the token (reference the token)
- Future request then received by the server verify and decode the token so the server knows who made the request

### Problems
[Quick JWT Demo](./jwt-demo-1.js)
- What is authentication?
  - Authentication is like a hotel key card
    - Would be really lame if you had to stop by the front desk every time you wanted to go into your room or use amenities
    - Hotel gives you a unique key card that you can use to access amenities and your room, but not the other people's rooms
  - When a user logs in: *are you who you say you are?* (use a password to check, two-factor authentication)
  ![auth-screen](/images/auth-screen.png)
- Big picture
  - User uses credentials to log into an application
  ![big-pic](/images/big-picture.png)
- Big picture is made up of smaller parts
  - After passing credentials, server sends back user id
  - User id is used to make requests and get responses
  - Client side application updates its state, changing the UI
    - Doing this with react but can be done with any cleint side framework
  - When a user takes further action: *who is this request coming from again?*
  ![smaller parts](/images/smaller-parts.png)
  ![closer](/images/closer_again.png)
- At some point, the user will refresh the page
  ![refresh](/images/refresh.png)
- LocalStorage to the rescue!
  - HTTP is not stateful and cannot remember that you are logged in
  - Will be using local storage so user does not have to authenticate every single time they refresh the browser! - like a mini database within browser
  - Lets us set keys and values
  ![local storage](/images/localStorage.png)
- Logging out
  - Removes value from localStorage
  - Update client state to re-render page
  ![logout](/images/logout.png)
- **Problem 1:**
  - Lucy realizes what Moe's id is and updates the localStorage to Moe's id
  - Acme Store thinks Moe is logged in
  ![problem 1](/images/lucy-is-moe.png)
- Problem 1 solution:
  - Use jsonwebtoken library to generate tokens
  - Valid token needs to be signed with a secret key only the server will know
  - User will not have that key and will not be able to modify the token
- Problem 2:
  - Passwords are stored as plain text
  - Someone gets Lucy's password
  ![problem 2](/images/bigger_proglems.png)
- Problem 2 solution:
  - Use the bcrypt library to hash the passwords of a user in a Sequelize hook
  - Password cannot be reverse engineered from the hash
  - Given a plain password and hash, the bcrypt library can tell if the hashed password in the database was "created" from a given plain password

<br>

### Tokens
#### Anatomy of a token
- A token consists of three parts separated by a "."
  - **Header** - meta-information on the HTTP request
    - Set a header on our request that contains the token
    ```js
    await axios.get('/', { header: {
      authorization: token
    }})
    ```
    - JWT uses **authorization** specifically as the header
  - **Payload** - holds claims (or key-value pairs)
    - Data inside the token
  - **Signature** - validates the token, makes sure it wasn’t altered
    - `jwt.sign` provide it with the payload and secret
    - The Secret alows the JWT to be uniquely tied to this specific application
- Motivation - don't want the user to have to continually sign in or tell us who they are

  ![token anatomy](/images/token-anatomy.png)


#### jsonwebtoken
- Two main functions:
  - **sign** - takes in data and a secret, returns a token
  - **verify** - takes in a token and a secret, returns the data if valid or throws an error if not
  ![json error](/images/json-error.png)

- Environment variables can be set on local machine and called from inside code:
  - From terminal: `JWT=yourSecretKeyHere`
  - From code: `const SECRET_KEY = process.env.JWT;`

- JWT is stored in frontend
  - Created on the server (request comes in)
  - JWT is stored in client's frontend (localStorage)
    - Can also be stored in cookies
      - Look into `express-session`

[Quick JWT Demo 2](./jwt-demo-2.jsjwt-demo-2.js)

### Demo 3 Pics
![auth demo 1](/images/auth-demo-1.jpg)
![auth demo 2](/images/auth-demo-2.jpg)
![auth demo 3](/images/auth-demo-3.jpg)
![auth demo 4](/images/auth-demo-4.jpg)
![auth demo 5](/images/auth-demo-5.jpg)

### Testing
On Postman, 
1) Have a tab on POST http://localhost:8080/auth/login
Click on Body tab and write in: 
  ```js
  {
  "email": "chris@gmail.com",
  "password": "123"
  }
  ```

2) Copy value from "token" key
3) Make a new tab on GET http://localhost:8080/api/users
4) Go to Headers and type in
Key: Authorization
Value: Paste in value from "token" key