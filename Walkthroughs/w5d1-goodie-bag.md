# [W5D1 Goodie Bag Walkthrough](hhttps://github.com/FullstackAcademy/GoodieBag)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `createdb goodie-bag`
  - If you check `server/db/database.js` it says `${pkg.name}`
  - Go to `package.json` and look for the name - "goodie-bag"
  - `server/db/database` - add package name to `const db = new Sequelize...`
    ```Javascript
    const db = new Sequelize(`postgres://localhost:5432/${pkg.goodiebag}`, {
      logging: false // so we don't see all the SQL queries getting made
    })
    ```
- `npm run start:dev`


#### Backend

- [X] **Write a `candies` model with the following information:**
  - [X] **name - not empty or null**
  - [X] **description - not empty or null**
  - [X] **quantity - cannot exceed 10 of the same candy in your goodie bag**
  - [X] **imageUrl - with a default value**
  - `server/db/models/candy` - need to define the model `Candy` (use dummy data and requirements as reference)
    - Some need to be [validated](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
  ```Javascript
  const Sequelize = require('sequelize');
  const db = require('../database');

  module.exports = db.define('candy', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 10
      }
    },
    imageUrl: {
      type: Sequelize.TEXT,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlHKhK0NMNG3Li4-MogcKD67VvJ3dlq8IZw&usqp=CAU'
    }
  });
  ```
  - `npm run seed`
- [X] **Write a route to serve up all candies**
  - `server/db/index.js`
    - Require `Candy` and export it!
    ```Javascript
    const db = require('./database')
    const Candy = require('../db/models/Candy')

    module.exports = {
      db,
      Candy
    }
    ```
  - `server/api/index.js` - all routes here are already mounted on '/api/
    - Require `Candy` and write the route to get all Candy information
    ```Javascript
    const Candy = require('../db/models/Candy');

    router.get('/candies', async (req, res, next) => {
      try {
        const allCandy = await Candy.findAll()
        res.send(allCandy)
      } catch (err) {
        next(err)
      }
    })
    ```
#### Frontend
- [ ] Write a candies sub-reducer to manage candies in your Redux store
- [ ] Write a component to display a list of all candies
- [ ] Display the all-candies component when the url matches `/candies`
- [ ] Add links to the navbar that can be used to navigate to the all-candies view and the home view (`/`)