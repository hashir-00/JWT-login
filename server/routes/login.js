const express = require("express");
const router = express.Router();
const {
  checkUsersByEmail,
  getUsersPasswordByEmail,
  getUserByall,
  getUsersDetailsByEmail,
} = require("../database/postgresql");
const { comparePassword } = require("../secrets/secret");
const verifyInfo = require("../controllers/validInfo");
const jwtGen = require("../controllers/jwtGen");

async function login(req, res) {
  try {
    const { user_email, user_password } = req.body;
    //check if user exist
    const user = await checkUsersByEmail(user_email);
    if (!user) {
      res.status(404).json("user not exist");
    } else {
      const storedPassword = await getUsersPasswordByEmail(user_email);

      const checkPassword = await comparePassword(
        user_password,
        storedPassword
      );

      if (checkPassword) {
        const new_user = await getUsersDetailsByEmail(user_email);
        const token = jwtGen(new_user.user_id);
        res.status(200).json({ status: "user logged", token: token });
      } else {
        res.status(401).json("password or Email incorrect");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
}

router.post("/login", verifyInfo, login);

module.exports = router;
