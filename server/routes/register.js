const express = require("express");
const router = express.Router();
const {
  insertUser,
  getUserByall,
  checkUserByName,
} = require("../database/postgresql");
const { hashPassword } = require("../secrets/secret");
const jwtGen = require("../controllers/jwtGen");
const verifyInfo= require('../controllers/validInfo')
//register

async function register(req, res) {
  try {
    //1.desturcture the body(name,email,password)
    const { user_name, user_email, user_password } = req.body;
    //2.check users
    await checkUserByName(user_name).then(async (data) => {
      if (data) {
        res.status(409).json("users exists");
      } else {
        //3.bcrypt the password
        const newPassword = await hashPassword(user_password);
        //4.save the user
        await insertUser(user_name, user_email, newPassword)
          .then(async () => {
            const new_user = await getUserByall(
              user_name,
              user_email,
              newPassword
            );
            //5.generate jwt token
            const token = jwtGen(new_user.user_id);
            res.status(200).json({status:"user added",token:token});
          })
          .catch((err) => res.send(err));
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
}

router.post("/register",verifyInfo,register );

module.exports = router;
