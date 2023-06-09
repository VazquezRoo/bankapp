// const Transfer = require("../models/transfer.model");
const User = require("../models/users.model");

exports.sentTransfer = async (req, res) => {
  try {
    const { senderUserId, receiverUserId, quantity } = req.body;

    const userSender = await User.findOne({
      where: {
        id: senderUserId,
      },
    });
    const userReceiver = await User.findOne({
      where: {
        id: receiverUserId,
      },
    });

    if (!userReceiver) {
      return res.status(404).json({
        status: "error",
        message: `The account with ${receiverUserId} is not found! 👎`,
      });
    }

    if (userSender.amount < quantity) {
      return res.status(404).json({
        status: "error",
        message: `you don't have enough funds! 👎`,
      });
    }

    await userSender.update({ amount: userSender.amount - quantity });
    await userReceiver.update({ amount: userReceiver.amount + quantity });

    return res.status(201).json({
      message: "The transfer is succesfull!👍",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong 👎",
      error,
    });
  }
};
