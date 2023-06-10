// const { body, validationResult } = require('express-validator');
const User = require('./../models/users.model');
const AppError = require('../utils/appError');

exports.validParams = async (req, res, next) => {
  //   const errors = validationResult(req);
  const { senderAccount, receiverAccount, quantity } = req.body;

  const userSender = await User.findOne({
    where: {
      accountNumber: senderAccount,
    },
  });
  const userReceiver = await User.findOne({
    where: {
      accountNumber: receiverAccount,
    },
  });

  if (!userReceiver) {
    return next(
      new AppError(`The account ${receiverAccount} is not found! 👎`)
    );
  }
  if (userSender.amount < quantity) {
    return next(new AppError(`You don't have enough funds! 👎`));
  }

  next();
};

// exports.createUserValidation = [
//   body('name').notEmpty().withMessage('Name cannot be empty'),
//   //   body('email')
//   //     .notEmpty()
//   //     .withMessage('Email cannot be empty')
//   //     .isEmail()
//   //     .withMessage('Must be a valid email'),
//   body('password')
//     .notEmpty()
//     .withMessage('Password cannot be empty')
//     .isLength({ min: 5 })
//     .withMessage('Password must be at least 5 characters long'),

//   body('amount')
//     .notEmpty()
//     .withMessage('Description cannot be empty')
//     .isLuhnNumber({ min: 1000 })
//     .withMessage('the minimum deposit is 1000! 😐'),
//   validParams,
// ];
