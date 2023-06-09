const { Transaction } = require('sequelize');
const User = require('../models/users.model');
const Transfer = require('../models/transfers.model');

//?crear usuario

exports.createUser = async (req, res) => {
  try {
    const { name, password, amount } = req.body;

    const accountNumber = Math.ceil(Math.random() * (999998 - 100001) + 100001);

    if (amount < 1000) {
      return res.status(404).json({
        status: 'error',
        message: `the minimum amount is 1000! 👎`,
      });
    }

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very 👎',
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong👎',
      error,
    });
  }
};

exports.getTransfers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong👎',
      error,
    });
  }
};
