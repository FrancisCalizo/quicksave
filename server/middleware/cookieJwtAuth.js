const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = user;

    next();
  } catch (err) {
    console.log(err);

    res.clearCookie('token');

    return res.sendStatus(403);
  }
};

exports.cookieJwtAuth = cookieJwtAuth;
