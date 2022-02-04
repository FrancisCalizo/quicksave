const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../db');

// @route     POST /register
// @desc      Register a new user
// @body      { email: string, password: string }
// @access    Public
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check DB if email already exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    // If so, return a 403 error
    if (user.rows.length) {
      return res.status(403).send('User email already exists');
    }

    // Hash password with bcrypt
    const hash = await bcrypt.hash(password, 10);
    // Insert Credentials into DB
    const newUser = await pool.query('INSERT INTO users (email, password) VALUES($1, $2) RETURNING *', [email, hash]);

    // Put the user info into a new object
    const userInfo = newUser.rows[0];

    // No need to store password in the cookie
    delete userInfo.password;

    // Sign a JWT to the user
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store that in a an HTTP Cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true,
      // maxAge: 1000000,
      // signed: true
    });

    // Return 200 Success Response
    return res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong with registration');
  }

  return res.json(200);
};
