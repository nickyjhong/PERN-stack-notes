# [W3D1 Cody's Cafe Walkthrough](https://github.com/FullstackAcademy/codys-cafe)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `npm test`
- `createdb codys_cafe`

## Coffee model
- `server/models/coffee.model.js`
  ```Javascript
  const Coffee = db.define('coffee', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ingredients: Sequelize.ARRAY(Sequelize.STRING)
  }) 
  ```
  - `getIngredients` is an instance method
  ```Javascript
  Coffee.prototype.getIngredients = function() {
    return this.ingredients.join(', ')
  }
  ```
  - `findByIngredient` is a class method
    - [ `Sequelize.Op.contains`](https://sequelize.org/v5/manual/querying.html#operators)
  ```Javascript
  Coffee.findByIngredient = function (ingredient) {
    return this.findAll({
      where: {
        ingredients: {
          [Sequelize.Op.contains]: [ingredient]
        }
      }
    });
  }
  ```
  - Add "love" to the list of ingredients if not already included
    - Make sure `ingredients` is an array
  ```Javascript
  Coffee.beforeSave(({ ingredients }) => {
    if (Array.isArray(ingredients) && !ingredients.includes('love')) {
      ingredients.push('love')
    }
  })
  ```
## Coffee Resource
- `server/routes/coffee.router.js` - routes are mounted on /api/coffee
  - GET '/coffee'
  ```Javascript
    router.get('/', async (req, res, next) => {
      const coffee = await Coffee.findAll()
      res.send(coffee)
  })
  ```
  - GET '/coffee/ingredients/:ingredientName'
    - `:ingredientName` is a wildcard - find coffee by that ingredient
    - Put this at the very bottom because of wildcard - should check all other routes first before hitting this one
  ```Javascript
  router.get('/ingredients/:ingredientName', async (req, res, next) => {
    const coffee = await Coffee.findByIngredient(req.params.ingredientName)
    res.send(coffee)
  })
  ```
  - GET '/coffee/:coffeeId'
    - Return coffee by specific id
    - Put above '/coffee/ingredients/:ingredientName' because of wildcard placement
  ```Javascript
  router.get('/:coffeeId', async (req, res) => {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if(!coffee) {
          res.sendStatus(404)
      } else {
          res.send(coffee)
      }
  })
  ```
  - POST '/coffee'
    - POST should create an instance using input (`req.body.name` and then send it)
  ```Javascript
  router.post('/', async (req, res) => {
    const coffee = await Coffee.create({name: req.body.name})
    res.status(201).send(coffee)
  })
  ```
## Pug model
- `server/models/pug.model.js`
  ```Javascript
  const Pug = db.define('pugs', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    biography: Sequelize.TEXT
  })
  ```
  - `isPuppy` is an instance method
  ```Javascript
  Pug.prototype.isPuppy = function() {
    return this.age < 1
  }
  ```
  - `shortBio` is an instance method
    - Return just the first sentence of bio - .slice at first punctuation
  ```Javascript
  Pug.prototype.shortBio = function() {
    // return this.biography.split(/[.!?]/)[0];
    const shortBio = this.biography
    for (let i = 0; i < shortBio.length; i++) {
      let char = shortBio[i];
      if (char === '.' || char === '!' || char === "?") {
        return shortBio.slice(0, i);
      }
    }
  }
  ```
  - `findByCoffee` is a class method
    - `findAll()` favorite coffee (need to include model: Coffee and alias 'favoriteCoffee')
    - Eager load favorite coffee (add where)
  ```Javascript
  Pug.findByCoffee = async function (coffee) {
    let result = await Pug.findAll({
      include: {
        model: Coffee, 
        as: 'favoriteCoffee',
        where: {
          name: coffee
        }
      }
    })
    return result
  }
  ```
  - Capitalize pug's name before saving to database
  ```Javascript
  Pug.beforeSave(pug => {
    pug.name = pug.name[0].toUpperCase() + pug.name.slice(1)
  })
  ```
- `models/index.js`
  - Associations
    - Pug has a one to many relationship with Coffee, via 'favoriteCoffee' - pug can have one favorite coffee and coffee can have many pugs
    - Pug has a many to many relationship with other Pugs as 'friends'
  ```Javascript
  Pug.belongsTo(Coffee, {as: 'favoriteCoffee'});
  Coffee.hasMany(Pug);
  Pug.hasMany(Pug, {as: 'friends'});
  ```

## Pugs Resource
- `server/routes/pugs.router.js`  routes are mounted on '/api/pugs'
  - GET  '/pugs/
  ```Javascript
  router.get('/', async (req, res) => {
    const pug = await Pug.findAll()
    res.send(pug)
  })
  ```
  - GET '/pugs/favoriteCoffee/:favoriteCoffeeName'
    - `:favoriteCoffee` wildcard
    - Uses `findByCoffee` class method - gets input through `req.params.` + `wildcard`
  ```Javascript
  router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res) => {
    const pug = await Pug.findByCoffee(req.params.favoriteCoffeeName)
    res.send(pug)
  })
  ```
  - GET '/pugs/:pugId'
  ```Javascript
  router.get('/:pugId', async (req, res) => {
    let pug = await Pug.findByPk(req.params.pugId)
    if(!pug) {
        res.sendStatus(404) 
    } else {
        res.send(pug)  
    }
  })
  ```
  - POST '/pugs'
    - Create an instance using input and send
    ```Javascript
    router.post('/', async (req, res) => {
      const pug = await Pug.create({name: req.body.name})
      res.status(201).send(pug)
    })
    ```
  - PUT '/pugs/:pugId'
    - `findByPk` using wildcard (`req.params.pugId`)
    - If the pug with that specific id exists, update it with input
    ```Javascript
    router.put('/:pugId', async (req, res) => {
      let pug = await Pug.findByPk(req.params.pugId)
      if(!pug){
          res.status(404).send('wtf')
      } else {
        await pug.update(req.body)
        res.send(pug)
      }
    }) 
    ```
  - DELETE '/pugs/:pugId'
    - `findByPk` using wildcard (`req.params.pugId`)
    - If the pug with that specific id exists, destroy it AND THEN send the status
  ```Javascript
  router.delete('/:pugId', async (req, res) => {
    let pug = await Pug.findByPk(req.params.pugId)
    if(!pug){
      res.sendStatus(404)
    } else {
      await pug.destroy()
      res.sendStatus(204)
    }
  })
  ```
## Funky Functions
- `server/funky-funcs/index.js`
  - `lodash` library has methods for each of these...
  ```Javascript
  const _ = require('lodash')

  const intersection = (arr1, arr2) => {
    return arr1.filter(el => {
      if (arr2.includes(el)) {
        return el;
      }
    })
  }

  const flattenDeep = (arr) => {
    return arr.flat(Infinity)
  }

  const flipArguments = (func) => {
    let flipped = _.flip(func)
    return flipped
  }

  const invert = (obj) => {
    // return _.invert(obj)
    let result = {}
    for (let key in obj) {
      result[obj[key]] = key
    }
    return result
  }

  const camelCase = (str) => {
    return _.camelCase([string = str])
  }
  ```