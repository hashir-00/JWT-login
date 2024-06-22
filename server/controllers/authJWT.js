const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const jwtoken = req.headers["token"];
    if (!jwtoken) {
      return res.status(403).json("Not Authorised");
    }
    jwtokencleared = jwtoken.replace(/"/g, '');
    const payload = jwt.verify(jwtokencleared, process.env.secret);
    req.user = payload.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json("No authorisation");
  }
};
