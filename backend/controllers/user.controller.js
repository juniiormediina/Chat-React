const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const signUp = async (data) => {
  /* const { firstName, lastName, email, profile, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    profile,
    password: await encryptPassword(password),
  });
  const savedUser = await newUser.save();
  res.status(200).json(savedUser); */

  return new Promise(async (res, rejc) => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.nickName
    ) {
      rejc({ status: 406, message: "Please fill all fields" });
    } else {
      bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) {
          rejc({
            status: 500,
            message:
              "Sorry, the server has presented an error. Try again later",
          });
        } else {
          data.password = hash;
          User.create(data)
            .then((user) => {
              res(user);
            })
            .catch((err) => {
              rejc({
                status: 500,
                message:
                  "Sorry, the server has presented an error. Try again later",
              });
            });
        }
      });
    }
  });
};

const signIn = (email, password) => {
  /* const userFound = User.findOne({ where: { email: req.body.email } });
  if (!userFound) return res.status(400).json({ message: "User not found" });
  console.log(req.body.password);
  const matchPassword = comparePassword(
    req.body.password,
    userFound.password
  ).catch((err) =>
    res.status(401).json({ message: "las contraseñas no coinciden" })
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });
  //TODO:Verificar porque genera error (OJO ESTA FUNCIONANDO BIEN)
  const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  res.status(200).json({ token }); */
  return new Promise(async (res, rejc) => {
    if (!email || !password) {
      rejc({ status: 406, message: "Please fill all fields" });
    } else {
      let user = await User.findOne({ where: { email: email } });
      let comparePassword = await bcrypt.compare(password, user.password);

      if (user && comparePassword) {
        delete user.password;
        res(
          jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "1h",
          })
        );
      } else {
        rejc({ status: 401, message: `Invalid password o user` });
      }
    }
  });
};

module.exports = { signUp, signIn };
