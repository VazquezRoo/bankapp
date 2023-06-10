const { body, validationResult } = require('express-validator');

const validParams = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  //   body('email')
  //     .notEmpty()
  //     .withMessage('Email cannot be empty')
  //     .isEmail()
  //     .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),

  body('amount')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isInt({ min: 1000 })
    .withMessage('the minimum deposit is 1000! 😐'),
  validParams,
];
