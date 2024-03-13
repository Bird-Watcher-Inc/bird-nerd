const { User } = require('../modelDB.js');
const bcrypt = require('bcryptjs');

const sessionController = {};

// REEM NOTE: THIS CONTROLLER CURRENTLY DOES NOT DO ANYTHING - to be updated

sessionController.isLoggedIn = (req, res, next) => {
  // needs to be improved to be more secure, maybe by logging the cookie into the DB and checking for it
  const found = req.cookies.sessionCookie
  res.locals.user = found; 
  return next(); 
}


module.exports = sessionController;




