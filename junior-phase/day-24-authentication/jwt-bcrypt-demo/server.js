const { syncAndSeed } = require('./db');
const app = require('./app');

const init = async () => {
  await syncAndSeed();
  const port = 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();