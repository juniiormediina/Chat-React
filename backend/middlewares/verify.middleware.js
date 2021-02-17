const User = require("../models/User.model");

const CheckDuplicateEmail = async (req, res, next) => {
  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) {
    return res.status(406).json({ message: "The email already exists" });
  }
  next();
};

const CheckDuplicateNickName = async (req, res, next) => {
  const nickName = await User.findOne({
    where: { nickName: req.body.nickName },
  });
  if (nickName) {
    return res.status(400).json({ message: "The nickName already exists" });
  }
  next();
};

module.exports = { CheckDuplicateEmail, CheckDuplicateNickName };
