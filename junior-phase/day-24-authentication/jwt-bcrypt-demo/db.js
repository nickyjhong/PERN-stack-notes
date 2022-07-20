const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { STRING } = Sequelize;

const conn = new Sequelize('postgres://localhost/authdemo');

const SALT_ROUNDS = 5;

const User = conn.define('user', {
  username: STRING,
  password: STRING,
});

// v BCRYPT ADDED
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});
// ^ BCRYPT ADDED

User.byToken = async (token) => {
  try {
    // v JWT ADDED
    const payload = jwt.verify(token, process.env.JWT);
    console.log('JWT payload:', payload);
    const user = await User.findByPk(payload.id);
    // ^ JWT ADDED
    if (user) {
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  // v BCRYPT ADDED
  if (user
      && await bcrypt.compare(password, user.password)) {
    // ^ BCRYPT ADDED
    // v JWT ADDED
    return jwt.sign({ id: user.id }, process.env.JWT);
    // ^ JWT ADDED
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await User.create({ username: 'dax', password: 'daxpass' });
};

module.exports = {
  syncAndSeed,
  models: {
    User,
  },
};