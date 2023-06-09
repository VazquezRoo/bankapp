const express = require('express');

//controllers
const usercontrollers = require('../controllers/user.controllers');

const router = express.Router();

router.route('/signup').post(usercontrollers.createUser);

router.route('/login').post(usercontrollers.login);

router.route('/:id/history').get(usercontrollers.getTransfers);

module.exports = router;
