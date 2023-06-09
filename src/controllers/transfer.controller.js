const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');

exports.sentTransfer = async (req, res) => {
  try {
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
      return res.status(404).json({
        status: 'error',
        message: `The account with ${receiverUserId} is not found! 👎`,
      });
    }

    if (userSender.amount < quantity) {
      return res.status(404).json({
        status: 'error',
        message: `you don't have enough funds! 👎`,
      });
    }

    // const transfer = {
    //   day: new Date(),
    //   amount: quantity,
    // };

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong 👎',
      error,
    });
  }
};
