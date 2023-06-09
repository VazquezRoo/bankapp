const User = require("../models/users.model");

//?crear usuario

exports.createUser = async (req, res) => {
  try {
    const { name, password, amount } = req.body;

    const user = await User.create({
      name,
      password,
      amount,
    });

    return res.status(201).json({
      message: "The user has been created!👍",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very 👎",
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
      status: "fail",
      message: "Something went very wrong👎",
      error,
    });
  }
};
