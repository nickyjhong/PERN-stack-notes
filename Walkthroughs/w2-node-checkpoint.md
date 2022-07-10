# [W2 Node-Express Checkpoint Walkthrough](https://github.com/FullstackAcademy/Checkpoint-Node-Express)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `npm test`

## Todo Model
- tasks = {'nicky': [
    {content: 'clean room'}, 
    {content: 'walk bean'}
  ]}
- `listPeople` returns an array of all people for whom tasks exist
  ```Javascript
  listPeople: function() {
    return Object.keys(tasks)
  }
  ```
- `add` takes a name and task and puts it in the `tasks` array
  - If the name is already a key, push the task into the array value
  - If the name is NOT a key, wrap the task in an array and make it the value of the name
  ```Javascript
  add: function(name, task) {
    if (tasks[name]) {
      tasks[name].push(task)
    } else {
      tasks[name] = [task]
    }
  }
  ```
- `list` takes a name and returns all tasks associated with that name
  ```Javascript
  list: function(name) {
    return tasks[name]
  }
  ```
- `complete` takes a name and index and will turn `complete` true
  - Need to go back into `add` and make sure that if `task.complete === undefined` it is automatically false
  ```Javascript
    add: function (name, task) {
      if (task.complete === undefined ) {
        task.complete = false;
      }
      if (tasks[name]) {
        tasks[name].push(task)
      } else {
        tasks[name] = [task]
      }
    },
      complete: function(name, index) {
      tasks[name][index].complete = true;
    }
    ```
- `remove` takes a name and index and will remove the index at that task
  ```Javascript
  remove: function(name, index) {
    tasks[name].splice(index, 1);
  }
  ```

## Todo Routes
- `routes/index.js`
  - GET `/users`
    ```Javascript
    router.get('/users', (req, res) => {
        res.send(todos.listPeople())
    });
    ```
  - GET `/users/:name/tasks` and error handling
    ```Javascript
    router.get('/users/:name/tasks', (req, res) => {
        let name = req.params.name;
        let value = req.query.status;
        let list = todos.list(name);
        
        if (!todos.listPeople().includes(name)) {
            res.status(404)
            
            const html =
            `<!DOCTYPE html>
            <html>
                <head>
                <title>404 Error</title>
                <link rel="stylesheet" href="/style.css" />
                </head>
                <body>
                <div class="not-found">
                    <p>Page Not Found</p>
                    <img src="/images/404.png" />
                </div>
                </body>
            </html>`
            
            // this is how to send a custom 404 error!
            res.send(html)
            // /users/:name/tasks?status=complete
        } else if (value === 'complete') {
            res.send(list.filter(todo => todo.complete === true))
            // /users/:name/tasks?status=active
        } else if (value === 'active') {
            res.send(list.filter(todo => todo.complete === false))
        } else {
            res.send(list)
        }
    })
    ```
  - POST `/users/:name/tasks` and error handling
    - `post` takes in something (`req.params`, `req.body`)
    ```Javascript
    router.post('/users/:name/tasks', (req, res) => {
        if(req.body.content === '') {
            res.status(400).send('Bad Request!')
        } else {
            todos.add(req.params.name, req.body)
            const list = todos.list(req.params.name)

            res.status(201).send(list[list.length - 1])
            // res.status(201).json(req.body)
            // res.status(201).send(req.body)
        }
    })
    ```

  - PUT `/users/:name/tasks`
  ```Javascript
    router.put('/users/:name/tasks/:index', (req, res) => {
      // const name = req.params.name;
      // const index = req.params.index;
      // const list = todos.list(name);

      // list[index].complete = true

      todos.complete(req.params.name, req.params.index)
      res.send('Task completed!')
  })
  ```
- DELETE `/users/:name/tasks`
  ```Javascript
  router.delete('/users/:name/tasks/:index', (req, res) => {
      // const name = req.params.name;
      // const index = req.params.index;

      // todos.remove(name, index);

      todos.remove(req.params.name, req.params.index)
      res.status(204).send('Task removed!')
  })
  ```