const { User } = require('../modelDB.js');
const bcrypt = require('bcryptjs');

const cookieController = {};

// checks if user is logged in uses their creds

cookieController.createCookie = (req, res, next) => {
    console.log(res.locals.username); 
    res.cookie('sessionCookie', res.locals.username, { httpOnly:true }); 
    return next()
}; 
 


module.exports = cookieController;




