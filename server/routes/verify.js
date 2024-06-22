const express = require("express");
const router = express.Router();
const verify = require("../controllers/authJWT");

async function verification(req, res) {
  try {
    res.json(true);
  } catch (error) {
    console.log(error);
  }
}

router.post("/is-verify", verify, verification);

module.exports = router;
