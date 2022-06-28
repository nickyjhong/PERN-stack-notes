# Express, Intro to DB, SQL
[⬅ Go Back](../week2.md)

## Important Steps! **Do it just to be sure**:
1. npm init || npm init -y
2. npm install express
    - adds dependencies {...}
    - installs node_modules
3. .gitignore
    - node_modules
    - package-lock.json

Add to package.json > scripts:
- "start": "node app.js"


## Notes:
### **API Requests**
- **GET**
- **POST**
- **PUT**
- **PATCH**
- **DELETE**
- **USE** - handles ALL verbs


### **Express**
``` Javascript
const express = require('express');
const app = express() 
```

``` Javascript
app.get('/', (req, res) => {
    res.send('Welcome to the main GET page)
})
```

``` Javascript
let PORT = 1337
app.listen(PORT, () => {
    console.log('Server has started on port: ${PORT}')
})
``` 
- URL Parameters: req.params
    - this is used to access a property
    - the colon : makes the next word a "wildcard"
        - whatever is in the URL needs to match what's being passed in req.params

``` Javascript 
app.get('/users/:id', (req, res) => {
    const userID = req.params.id
})
```

### **Express Middleware**
- Function that handles responding to requests
```Javascript
function (req, res, next) {...}
```
- Make changes to the request and the response objects

### **Express.static**
``` Javascript
const expressStatic = express.static(path.join(__dirname, 'public'))
app.use(expressStatic)
```
- This lets people see what's in the public folder!
- Files that don't change (static) - okay for people to have access to it

## **SQL**
- **Data Types**
    - INTEGER/LONG - whole numbers
    - DOUBLE/FLOAT/DECIMAL - decimal numbers
    - VARCHAR(x) - string that contains x number of characters
    - TEXT - unlimited number of characters, like a normal string
    - BOOLEAN - true or false
    - TIMESTAMP - date format

- Create a table:
``` Javascript
CREATE TABLE students (
    id INTEGER,
    name TEXT,
    age INTEGER,
    gender VARCHAR(1),
    address INTEGER
)

CREATE TABLE addresses (
    id INTEGER,
    street TEXT,
    zip INTEGER,
    city TEXT,
    state VARCHAR(2)
)
```

- Adding rows to a table:
``` Javascript
INSERT INTO students (id, name, age, gender, address)
VALUES
    (1, 'Nick D.', 20, 'M', 2),
    (2, 'Andy D.', 20, 'M', 2),
    (3, 'Beth M.', 23, 'F', 1),
    (4, 'Lisa N.', 20, 'F', 4)
```

- Select statement
``` Javascript
SELECT id, name, age FROM students WHERE age = 20;

SELECT students.id, name, street, zip, city FROM students
    JOIN addresses ON students.address = addresses.id;
```

### **Keywords**
- **SELECT** - which COLUMNS to includes in output table (shrinks the result horizontally)
- **FROM** - which TABLE to pull data from
- **JOIN** - another TABLE to glue/concatenate to the output
- **ON** - which COLUMNS must match when joining two tables
- **WHERE** - which ROWS to include in the output table (shrinks the result vertically)
- **AS** - shorthand for table names

### **CRUD**
- **INSERT** - insert new rows into a table
- **SELECT** - get data from a database
- **UPDATE** - update existing rows in a table
- **DELETE** - delete rows from a table
- **CREATE/DROP** - make/delete new dbs/tables/views/indices

### **Commands**
- \c dbName - connect
- \l - list
- \d - describe
- \d+ - like describe but see table
- \q - quit