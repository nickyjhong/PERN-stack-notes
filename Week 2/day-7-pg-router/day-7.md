# Node-Postgres (pg), Express Router()

## **Notes**
- Node-Postgres(pg) is a database connector
### **Express Router**
- Like a mini app within the app
- Allows you to break up the major parts of app into smaller modules
```Javascript
const router = express.Router()
```

### **Process of a Request**
1. Request enters Express
    - Run any of the app.use middleware that happens before our main routes (body-parser, logging middleware)
    - Go through the list of routes from top to bottom and try to match on the '/users'
        - If it matches, it will run the inner function `(req, res) => {}`
        - It it doesn't match, it will timeout (404)
2. Finds its matching route, runs its function
    ```Javascript
    app.get('/users', (req, res) => {...})
    ```
3. Inside the (req, res) function
    - Make a database call (query) to fetch all the users
    ```Javascript
    await client.query('SELECT * FROM users')
    ```
    - Send results to the client with `res.send(users)`