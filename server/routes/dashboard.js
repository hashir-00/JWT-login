const express = require("express");
const router = express.Router();
const verifyInfo = require("../controllers/authJWT");
const { getUserById } = require("../database/postgresql");

router.get('/',verifyInfo,async(req,res)=>{

  try {

   let currentUserId= await req.user
   let {user_name,user_email}= await getUserById(currentUserId)
   res.status(200).json(`${user_name},${user_email}`)
  } catch (error) {
        res.status(500).json({error: error.message})
  }
})

module.exports = router;