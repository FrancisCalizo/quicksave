const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../db');

// @route     POST /login
// @desc      Login an already existing user
// @body      { email: string, password: string }
// @access    Public
module.exports = async (req, res) => {
  try {
    // Get the form info from the request body
    const { email, password } = req.body;

    // Search the DB to see if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // If user exists, then...
    if (user.rows.length) {
      // Store the user info
      const userInfo = user.rows[0];

      // Validate the password given to the hashed password in the DB
      const validPass = await bcrypt.compare(password, userInfo.password);

      if (validPass) {
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
        return res.json(200);
      }

      // Username & Password don't match
      return res.status(403).send('Invalid Credentials');
    }

    // User doesn't exist, return 403 status
    return res.status(403).send('Invalid Credentials');
  } catch (err) {
    // Something went horribly wrong
    console.log(err);
    res.status(500).send('Something went wrong with login');
  }
};
