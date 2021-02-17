const express = require("express");
const router = express.Router();

const {
  CheckDuplicateEmail,
  CheckDuplicateNickName,
} = require("../middlewares/verify.middleware");

const { userCreate, userLogin } = require("../controllers/user.controller");

router.post(
  "/signUp",
  CheckDuplicateEmail,
  CheckDuplicateNickName,
  (req, res) => {
    const data = req.body;
    console.log(data);
    userCreate(data)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(error.status).json({ message: error.message });
      });
  }
);

router.post("/signIn", (req, res) => {
  const data = req.body;
  userLogin(data)
    .then((jwt) => {
      res.status(200).json(jwt);
    })
    .catch((error) => {
      res.status(error.status).json({ message: error.message });
    });
});

module.exports = router;
