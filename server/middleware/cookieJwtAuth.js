const jwt = require('jsonwebtoken');
const pool = require('../db');
const fns = require('date-fns');

const cookieJwtAuth = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      // Access Token is expired
      if (err.name === 'TokenExpiredError') {
        if (!refreshToken) return res.json('Unauthorized');

        // Check if Session is valid in the Datatabase
        const token = await pool.query('SELECT * FROM session WHERE refresh_token = $1', [refreshToken]);

        // If session is found, check if Refresh Token is still valid
        if (token.rows?.[0]?.expiration_date) {
          const { user_id, expiration_date } = token.rows[0];

          const isValid = fns.isAfter(expiration_date, new Date());

          // If not valid, remove session from the DB
          if (!isValid) {
            // TODO: Remove the session from the DB

            // return res.json('Unauthorized');
            return res.sendStatus(403);
          }

          // Session is Valid, so generate a new Access Token
          const user = await pool.query('SELECT * FROM users WHERE userid = $1', [user_id]);

          const userInfo = user.rows[0];

          delete userInfo.password;

          const newAccessToken = generateAccessToken(userInfo);

          // console.log(newAccessToken);

          res.clearCookie('accessToken');

          res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            // secure: true,
            // maxAge: 1000000,
            // signed: true
          });

          // Return 200 Success Response
          // return res.status(200).json({ user: user.rows[0] });
          req.user = user;

          next();
          // return res.status(200).json({ user: userInfo });
        }

        return res.sendStatus(403);
        // return res.json('Unauthorized');
      }

      if (err.name === 'JsonWebTokenError') {
        // res.clearCookie('accessToken');

        // return res.json('Unauthorized');
        return res.sendStatus(403);
      }
    }

    // Twas Successful
    const user = decoded;

    delete user.iat;
    delete user.exp;

    req.user = user;

    next();
    // return res.status(200).json({ user: user });
  });
};

exports.cookieJwtAuth = cookieJwtAuth;
