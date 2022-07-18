# Single-Page Applications and AJAX
[⬅ Go Back](/week3.md)

- Asynchronous Javascript and XML
 - JSON took over so it should be Asynchronous Javascript and Json (AJAJ)
 
## Notes
- Single Page Application (SPA)
- Dynamically rewrites/modifies current page rather than loading entire new pages from a server!
    - It doesn't load a new page every single time
- No reload/refresh within user interface
- Javascript manipulates the DOM
- Essentially works like a desktop application

### Notes from Demo
`form.addEventListener('submit', ...)` submit is a special event listener for forms

`event.preventDefault()` prevents page from refreshing

### Axios
- Axios response will return a large object with other objects within it
- Deconstruct the response to just get the data!
    ```Javascript
    async function fetchUsers() {
        const { data } = await axios.get('/api/users')
        // same as const data = response.data

        console.log(data)
    }
    ```
- The second argument in a post request is the data / req.body
    ```Javascript
    app.post('/api/users', (req, res) => {
        const { name } = req.body
        users.push({ name })
        res.send(users[users.length - 1])
    })

    async function addUser(someName) {
        const { data } = await axios.post('/api/users', { name: someName })
        console.log('added!', data)
    }
    ```