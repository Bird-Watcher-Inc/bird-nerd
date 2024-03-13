const { User } = require('../modelDB.js');
const bcrypt = require('bcryptjs');

const sessionController = {};

// checks if user is logged in uses their creds

sessionController.isLoggedIn = (req, res, next) => {
  // needs to be improved to be more secure, maybe by logging the cookie into the DB and checking for it
  const found = req.cookies.sessionCookie
  res.locals.user = found; 
  return next(); 
}


module.exports = sessionController;




