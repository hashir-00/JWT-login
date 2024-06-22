const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const jwtoken = req.header("token");
    if (!jwtoken) {
      return res.status(403).send("Not Authorised");
    }
    const payload = jwt.verify(jwtoken, process.env.secret);
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("No authorisation");
  }
};
