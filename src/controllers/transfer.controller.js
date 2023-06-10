const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

exports.sentTransfer = catchAsync(async (req, res, next) => {
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

  // if (!userReceiver) {
  //   return next(
  //     new AppError(`The account with ${receiverUserId} is not found! 👎`)
  //   );
  // }

  // if (userSender.amount < quantity) {
  //   return next(new AppError(`You don't have enough funds! 👎`));
  // }

  await userSender.update({ amount: userSender.amount - quantity });
  await userReceiver.update({ amount: userReceiver.amount + quantity });

  const transfer = await Transfer.create({
    amount: quantity,
    senderUserId: userSender.id,
    receiverUserId: userReceiver.id,
  });

  return res.status(201).json({
    message: 'The transfer is succesfull!👍',
    transfer,
  });
});
