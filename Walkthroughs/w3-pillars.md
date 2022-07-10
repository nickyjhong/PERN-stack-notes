# [W3 Pillars Walkthrough](https://github.com/FullstackAcademy/Checkpoint-Pillars-v2)
[⬅ Go Back](./walkthrough-directory.md)

[Video Walkthrough](https://www.youtube.com/watch?app=desktop&v=8m6e6NRTmdM&list=PL_yPiP-ZZLhKph-MuCSKujl_MVved1OWC&index=1&ab_channel=FullstackAcademyPrograms)

## Instructions
- `createdb pillars_test`
- `npm install`
- `npm run start-dev-seed`
- `npm run test-dev`

## Tier 1: Basic Fields, Class Methods, GET Routes
- `server/db/User.js`
  - `user` table has a name and userType 
    ```Javascript
    const User = db.define('user', {
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      userType: {
        type: Sequelize.ENUM('STUDENT', 'TEACHER'),
        defaultValue: 'STUDENT',
        allowNull: false,
      },
      isStudent: {
        type: Sequelize.VIRTUAL,
        get() {
          return (this.userType === 'STUDENT')
        }
      },
      isTeacher: {
        type: Sequelize.VIRTUAL,
        get() {
          return (this.userType === 'TEACHER')
        }
      }
    });
    ```
  - `User.findUnassignedStudents` is a class method that finds and returns ALL students without a mentor (mentorId will be blank)
    ```Javascript
    User.findUnassignedStudents = async function() {
      let students = await User.findAll({
        where: {
          userType: 'STUDENT',
          mentorId: null
        }
      })
      return students
    }
    ```
- `server/routes/users.js`
  - GET '/api/users/unassigned' - route just has to be '/unassigned' because routes are mounted on '/api/users' already
  - Should be async request that awaits the class method User.findUnassignedStudents()
  - `res.send` the promise returned
  ```Javascript
  router.get('/unassigned', async (req, res, next) => {
    try {
      const students = await User.findUnassignedStudents()
      res.send(students)
    } catch(err) {
      next(err)
    }
  })
  ```
## Tier 2: [Eager Loading](https://sequelize.org/master/manual/eager-loading.html#fetching-an-aliased-association), One-To-Many Associations
- `server/db/User.js`
  - `User.findTeachersAndMentees` is a class method that returns all teachers and teacher's assigned mentees
    - Go through the `user` table and find everyone whose `userType` matches 'TEACHER'
    - The associations have already been made:
      ```Javascript
      User.belongsTo(User, { as: 'mentor' });
      // Table references itself - 'mentees' as an alias
      User.hasMany(User, { as: 'mentees', foreignKey: 'mentorId' });
      ```
    - Eager loading expects us to use `include` a model and apply the alias
  ```Javascript
  User.findTeachersAndMentees = async function() {
    let teachers = await User.findAll({
      where: {
        userType: 'TEACHER'
      },
      include: {
        model: User,
        as: 'mentees'
      }
    })
    return teachers
  }
  ```
- `server/routes/users.js`
  - GET '/api/users/teachers' - similar to route made for students but use `User.findTeachersAndMentees()` method instead
  ```Javascript
  router.get('/teachers', async (req, res, next) => {
    try {
      const teachers = await User.findTeachersAndMentees()
      res.send(teachers)
    } catch(err) {
      next(err)
    }
  })
  ```
## Tier 3: [Virtual Fields](https://sequelize.org/master/manual/getters-setters-virtuals.html), Route Parameters, DELETE Routes
- Virtual fields are fields that Sequelize populate but don't exist in database
- `server/db/User.js`
  - In the `user` table, make VIRTUAL FIELDS called `isStudent` and `isTeacher`
    - type is `Sequelize.VIRTUAL` so it doesn't show up on table
    - Make a `getter()` to retrieve information when called
  ```Javascript
  isStudent: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.userType === 'STUDENT')
    }
  },
  isTeacher: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.userType === 'TEACHER')
    }
  }
  ```
- `server/routes/users.js`
  - DELETE '/api/users/:id'
    - `/:id` in the URL is like a wildcard - grab the id to use it with `req.params.id`
    - If the `id` entered in URL is not a number, `sendStatus(400)` and `return` (don't forget to return or it'll give a wall of errors!)
    - Find the user by using `User.findByPk(id)` to return just ONE single user with that specific id
    - If the user doesn't exist (null), `sendStatus(404)` and `return`
    - If the user does exist, `await user.destroy()` - don't assign this to a variable and try to send because it's already destroyed! Just send the status
      - `.destroy()` the instance

  ```Javascript
  router.delete('/:id', async(req, res, next)=>{
    try {
      const id = req.params.id;

      if(isNaN(id)){
        res.sendStatus(400);
        return
      }
      // no idea why it only works if I declare it here...
      const user = await User.findByPk(id);

      if(user === null){
        res.sendStatus(404);
        return
      }

      await user.destroy()
      res.sendStatus(204)
    } catch(err){
      next(err);
    }
  });
  ```
## Tier 4: POST Routes, Request Body
- `server/routes/users.js`
  - POST '/api/users'
    - Check if the user already exists (someone has the name) using `User.findOne()`
    - If the user doesn't exist,
      - Create a new instance of the user using `User.create(req.body)`
      - Set the status and send the user
      - RETURN!
    - If the user already exists, `sendStatus(409)`

  ```Javascript
  router.post('/', async(req, res, next) => {
    try {
      // does the user exist?
      const doesNameExist = await User.findOne({
        where: {
          name: req.body.name
        }
      })

      if (!doesNameExist) {
        const newUser = await User.create(req.body)
        res.status(201).send(newUser)
        return
      }
      res.sendStatus(409)

    } catch (err) {
      next(err)
    }
  })
  ```
## Tier 5: Sequelize Update Hook, PUT Routes, Express Error Handling
- `server/db/User.js`
  - Check to see if the user is a student and is has a mentor - if true, throw error
    ```Javascript
      User.beforeUpdate(async (user) => {
      const hasMentor = await User.findByPk(user.mentorId)
      if (hasMentor && hasMentor.isStudent) {
        throw new Error (`${user} is a student!`)
      }
    })
    ```
  - Check to see if user is a teacher and has mentees - if true, throw error
    ```Javascript
    User.beforeUpdate(async (user) => {
      const hasMentees = user.mentorId
      if (user.isTeacher && hasMentees) {
        throw new Error (`Cannot update when student has a mentor!`)
      }
    })
    ```
  - Check to see if user is a student and has a mentor - if true, throw error
    ```Javascript
    User.beforeUpdate(async (user) => {
      const hasMentor = await User.findOne({
        where: {
          mentorId: user.id
        }
      })
      if (user.isStudent && hasMentor) {
        throw new Error (`Cannot update when teacher has mentees!`)
      }
    })
    ```
  - Can also put everything into one hook!
    ```Javascript
    User.beforeUpdate(async (user) => {
      const usersMentor = await user.getMentor()
      if (usersMentor) {
        if (usersMentor.isStudent) {
          throw new Error('Mentors must be teachers')
        }
        if (user.isTeacher) {
          throw new Error ('Mentees must be students')
        }
      }
      const usersMentees = await user.getMentees()
      if (userMentees.length > 0) {
        if (user.isStudent) {
          throw new Error('Mentors must be teachers')
        }
      }
    })
    ```
- `server/routes/users.js`
  - PUT '/api/users/:id'
    - Place at bottom because it is a wildcard. Everything else should be checked first before hitting this route
    - Grab id using `req.params.id`
    - Find the specific user using the id (`User.findByPk(id)`)
    - If no user is found, `sendStatus(404)`
  ```Javascript
  router.put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id)
      const name = req.body.name;
      const userType = req.body.userType;

      if (!user) {
        res.sendStatus(404)
      } else {
        user.name = name;
        user.userType = userType;
        res.send(user)
      }
    } catch(err) {
      next(err)
    }
  })
  ```
  - Another way to solve:
  ```Javascript
  router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      res.sendStatus(404)
      return
    }
    const results = await User.update(req.body {
      where: {
        id: id
      },
      returning: true,
      individualHooks: true,
    })
    const updatedUser = results[1][0]
    res.status(200).send(updatedUser)
  })
  ``` 
## Extra Credit
- `/server/db/User.js`
  - `getPeers` is an instance method on User
    - `User.findAll()` with the same mentorId
    - .filter to return peers (not including self)
    ```Javascript
    User.prototype.getPeers = async function() {
      const peers = await User.findAll({
        where: {
          mentorId: this.mentorId
        }
      })
      return peers.filter(peer => peer.name !== this.name)
    }
    ```
- `/server/db/Subject.js`
  - Make a new subject
  ```Javascript
  const Sequelize = require('sequelize');
  const db = require('./db');

  const Subject = db.define('subject', {
      name: Sequelize.STRING
  });

  module.exports = Subject;
  ```
- `server/db/index.js`
  - Make associations between `Subject` and `User` tables
    - User can have many Subjects
    - Subjects can have many users
  ```Javascript
  const Subject = require('./Subject')
  Subject.belongsToMany(User, {through: 'class'});
  User.hasMany(Subject)
  ```
- `server/routes/users.js`
  - Return all users matching the username in the query params
  - Turn value of query to lowercase
  - `User.findAll()` - make sure the search is [case insenstive](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)!
  ```Javascript
  router.get('/', async (req, res, next) => {
    try {
      let value = req.query.name.toLowerCase();

      let names = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${value}%`
          }
        }
      })
      // names.map(name => name.name)
      res.send(names)
    } catch(err) {
      next(err)
    }
  })
  ```