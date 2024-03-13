const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.post('/signup', userController.createUser,cookieController.createCookie, (req, res) => {
  return res.status(200).json(res.locals.username);
});

router.post('/signin', userController.verifyUser, cookieController.createCookie, (req, res) => {
  
  return res.redirect('/display_all_posts');
});

module.exports = router;
