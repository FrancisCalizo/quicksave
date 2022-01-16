const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (err) {
    console.log(err);

    res.clearCookie('token');

    return res.json({
      status: 403,
      error: 'Unauthorized',
    });
  }
};

exports.cookieJwtAuth = cookieJwtAuth;
