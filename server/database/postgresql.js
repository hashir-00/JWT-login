const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tute",
  password: "yo123",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});

//get a users all details
async function getUserByall(user_name,user_email,user_hash_password){
  const sql = 'SELECT * FROM users WHERE user_name=$1 AND user_email=$2 AND user_password=$3';
  const values = [
    user_name,
    user_email,
    user_hash_password
  ]
  try {
    const res = await pool.query(sql,values);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return false; // or throw an error if you prefer
  }

}


async function checkUserByName(user_name) {
  const sql = "SELECT * FROM users WHERE user_name=$1";
  const values = [user_name];

  try {
    const res = await pool.query(sql, values);
    return res.rows.length > 0;
  } catch (err) {
    console.log(err);
    return false; // or throw an error if you prefer
  }
}
async function getUserById(user_Id) {
  const sql = "SELECT * FROM users WHERE user_id=$1";
  const values = [user_Id];

  try {
    const res = await pool.query(sql, values);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return console.log(err)
  }
}
async function checkUsersByEmail(user_email) {
  const sql = "SELECT * FROM users WHERE user_email=$1";
  const values = [user_email];

  try {
    const res = await pool.query(sql, values);
    return res.rows.length > 0;
  } catch (err) {
    console.log(err);
    return false; // or throw an error if you prefer
  }
}
async function getUsersPasswordByEmail(user_email) {
  try {
    const sql = "SELECT user_password FROM users WHERE user_email=$1";
    const value = [user_email];
    const res = await pool.query(sql, value);
    return res.rows[0].user_password;
  } catch (err) {
    console.log(err);
  }
}
async function getUsersDetailsByEmail(user_email) {
  try {
    const sql = "SELECT * FROM users WHERE user_email=$1";
    const value = [user_email];
    const res = await pool.query(sql, value);
    return res.rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function getUsersPassword(user_name) {
  try {
    const sql = "SELECT user_password FROM users WHERE user_name=$1";
    const value = [user_name];
    const res = await pool.query(sql, value);
    return res.rows[0].user_password;
  } catch (err) {
    console.log(err);
  }
}
async function getUsersEmail(user_name) {
  try {
    const sql = "SELECT user_email FROM users WHERE user_name=$1";
    const value = [user_name];
    const res = await pool.query(sql, value);
    return res.rows[0].user_email;
  } catch (err) {
    console.log(err);
  }
}

async function insertUser(userName, email, password) {
  const sql =
    "INSERT INTO users(user_name,user_email,user_password) VALUES($1,$2,$3)";
  const values = [userName, email, password];
  try {
    const res = await pool.query(sql, values);
    return res.rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {getUserById,checkUsersByEmail,getUsersPasswordByEmail,getUsersDetailsByEmail,
  checkUserByName, insertUser, getUsersPassword, getUsersEmail,getUserByall };
