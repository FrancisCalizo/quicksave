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

        // Sign a JWT to the user & create Access|Refresh Tokens
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = generateRefreshToken(userInfo);

        // Store ACCESS TOKEN in HTTP Cookie
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          // secure: true,
          // maxAge: 1000000,
          // signed: true
        });

        // Store REFRESH TOKEN in HTTP Cookie
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          // secure: true,
          // maxAge: 1000000,
          // signed: true
        });

        // Store REFRESH TOKEN info into the database
        await pool.query(
          "INSERT INTO session (user_id, refresh_token, generated_date, expiration_date) VALUES($1, $2, NOW(), NOW() + INTERVAL '30 DAY' ) RETURNING *",
          [userInfo.userid, refreshToken]
        );

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
    console.log(err.message);
    res.status(500).send('Something went wrong with login');
  }
};

function generateAccessToken(userInfo) {
  return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

function generateRefreshToken(userInfo) {
  return jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET);
}
