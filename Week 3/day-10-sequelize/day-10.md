# Sequelize

## Important Steps! **Do it just to be sure**:
1. npm install express
2. npm install sequelize
3. npm install pg

Add to package.json > scripts:
- "seed": "node seed.js",
- "start": "nodemon app.js"


## Notes:
### **Keys**
🔑  **Primary key** - key on the table that distinguishes rows from each other (usually Id -- makes it unique) \
🔑  **Foreign key** - the link to a primary key to another table

### **Body Parsers**
- app.use(express.json()) - turns json into regular js object
- app.use(express.urlencoded({ extended: false })) - for XML/HTML form data


### [**Associations**](https://sequelize.org/docs/v6/core-concepts/assocs/)
- One-To-One 
    - hasOne
    - belongsTo
- One-To-Many 
    - hasMany
    - belongsTo
- Many-To-Many
    - belongsToMany

## Resources:

#### [🔗 **Sequelize REPL**](https://replit.com/@nickyjhong/Sequelize-Review#routes/tasks.js)

#### [🔗 **Sequelize Cheatsheet**](hhttps://dev.to/projectescape/the-comprehensive-sequelize-cheatsheet-3m1m)

#### [🔗 **Magic Methods**](https://gist.github.com/jsmney/012c5e123d343171e2bc12ced6553bbe#file-magicmethods-csv)