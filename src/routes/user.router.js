const express = require('express');

//controllers
const usercontrollers = require('../controllers/user.controllers');
const validParams = require('./../middlewares/params.middelwares');

const router = express.Router();

router
  .route('/signup')
  .post(validParams.createUserValidation, usercontrollers.createUser);

router.route('/login').post(usercontrollers.login);

router.route('/:id/history').get(usercontrollers.getTransfers);

module.exports = router;
