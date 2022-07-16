const usersRouter = require('express').Router();
const {
  getUserByEmail,
  getAllUsers,
  createUser,
  updateUser,
} = require('../db/models/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { requireUser } = require('./utils');
const bcrypt = require('bcrypt');

usersRouter.use('/', (req, res, next) => {
  console.log('Request to /users is being made.');
  next();
});

usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    console.log('getting USER by email api: ', user);

    if (user && bcrypt.compareSync(password, user.password)) {
      console.log('LOGIN SUCCESS');
      const token = jwt.sign(
        { id: user.id, email: email },
        process.env.JWT_SECRET,
        { expiresIn: '1w' }
      );
      res.send({
        message: `Welcome Back!`,
        token: token,
      });
    } else {
      console.log('LOGIN FAILED');
      res.status(409);
      next({
        name: 'Bad Login/Password',
        message: 'Login error: you must supply a valid login/password',
      });
    }
  } catch ({ name, message }) {
    res.status(404);
    next({ name, message });
  }
});

usersRouter.get('/me', requireUser, (req, res, next) => {
  res.send(req.user);
});

usersRouter.get('/all', requireUser, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch ({ name, message }) {
    res.status(409);
    next({ name, message });
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { email, password, firstName, lastName, department } = req.body;
  try {
    const _user = await getUserByEmail(email);
    if (_user) {
      res.status(409);
      next({
        name: 'UserAlreadyExistsError',
        message: 'Email is already registered',
      });
    } else {
      const user = await createUser({
        email,
        password,
        firstName,
        lastName,
        department,
      });
      console.log('api route for user registration.', user);
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1w',
        }
      );
      res.send({
        message: `${email} is now registered`,
        token,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.patch('/:userId', requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { email, firstName, lastName, department, position, officeNumber } =
    req.body;
  console.log('api- userId', userId);
  try {
    const editUser = await updateUser({
      id: +userId,
      email,
      firstName,
      lastName,
      department,
      position,
      officeNumber,
    });
    console.log('api - user patch', editUser);
    res.send({ editUser });
  } catch ({ name, message }) {
    res.status(409);
    next({ name, message });
  }
});

module.exports = usersRouter;
