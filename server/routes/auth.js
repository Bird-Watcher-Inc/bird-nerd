const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.username);
});

router.post('/signin', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.username);
});

module.exports = router;
