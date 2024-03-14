const { User } = require('../modelDB.js');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
  User.create({ username, password })
    .then((data) => {
      res.locals.username = data.username;
      next();
    })
    .catch((err) => {
      return next({
        log: 'Error occurred in create user',
        status: 500,
        message: { err: 'An error occurred' },
      });
    });
};

userController.verifyUser = (req, res, next) => {
  console.log('verifying user');
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
  User.findOne({ username })
    .then((data) => {
      bcrypt.compare(password, data.password).then((result) => {
        if (!result) {
          // TODO change state to signup
          res.redirect('/signup');
        } else {
          res.locals.username = data.username;
          return next();
        }
      });
    })
    .catch((err) => {
      return next({
        log: 'Error occurred in verifyUser',
        status: 500,
        message: { err: 'An error occurred' },
      });
    });
};


module.exports = userController;
