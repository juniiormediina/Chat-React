const express = require("express");
const router = express.Router();

const {
  CheckDuplicateEmail,
  CheckDuplicateNickName,
} = require("../middlewares/verify.middleware");

const { signUp, signIn } = require("../controllers/user.controller");

router.post(
  "/signUp",
  CheckDuplicateEmail,
  CheckDuplicateNickName,
  (req, res) => {
    /* signUp(req, res); */
    signUp(req.body)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(error.status).json(error.message);
      });
  }
);

router.post("/signIn", (req, res) => {
  // signIn(req, res);
  const { email, password } = req.body;
  signIn(email, password)
    .then((jwt) => {
      res.status(200).json(jwt);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

module.exports = router;
