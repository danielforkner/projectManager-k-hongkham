const apiRouter = require('express').Router();
const usersRouter = require('./users');
const customersRouter = require('./customers');
const { getUserByEmail } = require('../db/models/users');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  console.log('Checking for authorization...');
  const prefix = `Bearer `;
  const auth = req.header('Authorization');
  if (!auth) {
    console.log('No auth provided. Continuing.');
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { email } = jwt.verify(token, JWT_SECRET);
      if (email) {
        console.log('Good token. Setting user.');
        let user = await getUserByEmail(email);
        delete user.password;
        req.user = user;
        console.log("WHO'S THE USER IN API", user);
        next();
      } else {
        res.status(409);
        next({ name: 'BadTokenError', message: 'Invalid Token' });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    res.status(409);
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'specify an api route to proceed',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/customers', customersRouter);

apiRouter.use((error, req, res, next) => {
  console.log('SENDING ERROR: ', error);
  res.send(error);
});

export default apiRouter;
