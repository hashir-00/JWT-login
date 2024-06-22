const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashPassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, hashPassword) {
  try {
    const comparedPassword = await bcrypt.compare(password, hashPassword);
    return comparedPassword;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
