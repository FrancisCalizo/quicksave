const bcrypt = require('bcrypt');
const pool = require('../db');

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

    const hash = await bcrypt.hash(password, 10);

    const newUser = await pool.query('INSERT INTO users (email, password) VALUES($1, $2) RETURNING *', [email, hash]);

    res.status(200).json(newUser.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong with registration');
  }

  return res.json(200);
};
