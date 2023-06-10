const User = require('../models/users.model');
const Transfer = require('../models/transfers.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//?crear usuario

exports.createUser = catchAsync(async (req, res) => {
  const { name, password, amount } = req.body;

  const day = new Date();
  const accountNumber =
    day.getHours().toString().padStart(2, '0') +
    day.getMinutes().toString().padStart(2, '0') +
    Math.ceil(Math.random() * (998 - 2) + 2)
      .toString()
      .padStart(3, '0');

  const user = await User.create({
    name,
    password,
    amount,
    accountNumber,
  });

  return res.status(201).json({
    message: 'The user has been created!👍',
    user,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
    },
  });

  return res.status(201).json({
    message: `Welcome ${user.name}!👍`,
    user,
  });
});

exports.getTransfers = catchAsync(async (req, res) => {
  const { id } = req.params;

  const transfers = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
  });

  return res.status(201).json({
    message: `Transfers!`,
    quantity: transfers.length,
    transfers,
  });
});
