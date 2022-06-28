# ORM (Sequelize), WikiStack 1
[⬅ Go Back](../week2.md)

## **Notes**
### **Requiring**
```Javascript
const Sequelize = require('sequelize')
```

### **Connecting**
1. Create connection object and point to a db
```Javascript
const db = new Sequelize('postgres://localhost/wiki')
```
2. Sync to db using `db.sync()`
    - Sequelize can override existing tables in db `db.sync({ force: true })`

### **Creating Models**
- Create new model, return a reference to a model
```Javascript
db.define('tableName', {})
```
Note:  'tableName' is singular. It automatically becomes plural in our db

- Each field must have a type
```Javascript
age: Sequelize.INTEGER,
name: {
    type: Sequelize.TEXT,
    allowNull: false
}
```

### **Creating Instances**
- New instance
``` Javascript
await Model.create()
```

### **Other Class Methods**
- Model.bulkCreate() - creates many rows (pass in an array of objects)
- Model.findAll() - retrieves all rows in a table -> filter results by passing a where clause
- Model.findByPk() - retrieves a single row with the given primary key
    - Model.findById() - deprecated; same as findByPk
- Model.update() - updates all rows mathcing a given where clause
- Model.destroy() - deletes all rows mathcing a given where clause

### **Lifecycle events**
- Sequelize models can be extended: Hooks, Class and Instance methods, Getters & Setters, Virtuals, etc.
- Hooks are like adding an event listener to a lifecycle event

```Javascript
beforeValidate
validate
afterValidate
beforeCreate
creation
afterCreate
```

### **Associations**
- Relationship between two tables
    - Use foreign-key or join-table
- Creates several special instance methods (getAssociation, setAssociation) that an instance can use to search for the instance they are related to