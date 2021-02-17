const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const signUp = async (data) => {
  return new Promise(async (res, rejc) => {
    if (
      !data.nickName ||
      !data.email ||
      !data.firstName ||
      !data.lastName ||
      !data.password
    ) {
      rejc({ status: 406, message: "Please fill all fields" });
    } else {
      bcrypt.hash(data.password, 10, (err, encrypted) => {
        if (err) {
          rejc({
            status: 500,
            message:
              "Sorry, the server has presented an error. Try again later",
          });
        } else {
          data.password = encrypted;
          User.create(data)
            .then((user) => {
              delete user.dataValues.password;
              res({ message: "user created successfully" });
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

const signIn = (data) => {
  return new Promise(async (res, rejc) => {
    if (!data.nickName || !data.password) {
      rejc({ status: 406, message: "Please fill all fields" });
    } else {
      const { password, nickName } = data;

      let user = await User.findOne({
        where: { nickName: nickName },
        raw: true,
      });

      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            rejc({
              status: 500,
              message:
                "Sorry, the server has presented an error. Try again later",
            });
          }
          if (result) {
            delete user.password;
            delete user.connected;
            res({
              token: jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: 86400, // 24 hours
              }),
            });
          } else {
            rejc({ status: 401, message: `Invalid password o user` });
          }
        });
      } else {
        rejc({ status: 401, message: `Invalid password o user` });
      }
    }
  });
};

const connectedUsers = () => {
  return new Promise((res, rejc) => {
    User.findAll({ where: { connected: 1 } })
      .then((users) => {
        res(users);
      })
      .catch((error) => {
        rejc(error);
      });
  });
};

module.exports = { signUp, signIn, connectedUsers };
