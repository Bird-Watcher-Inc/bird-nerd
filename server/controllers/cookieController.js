const { User } = require('../modelDB.js');
const bcrypt = require('bcryptjs');

const cookieController = {};

// checks if user is logged in uses their creds

cookieController.createCookie = (req, res, next) => {
    console.log(res.locals.username); 
    console.log('Origin', req.headers.origin); 
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", 'date, etag, access-control-allow-origin, access-control-allow-credentials');
   
    res.cookie('sessionCookie', `${res.locals.username}`, {
        // httpOnly: true, 
        path:"/",
        // domain: "localhost3000",
        // secure: false, 
        SameSite: "None",
        maxAge: 3600000, 
    }); 
    // res.set('Access-Control-Allow-Origin', req.headers.origin)
    // res.set('Access-Control-Allow-Credentials', 'true')
    // res.set(
    //     'Access-Control-Expose-Headers',
    //     'date, etag, access-control-allow-origin, access-control-allow-credentials'
    //   );

    return next()
}; 
 


module.exports = cookieController;




