const jwt = require('jsonwebtoken');

module.exports = cookieJwtAuth = (req, res) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);

    res.clearCookie('token');

    return res.json({
      status: 403,
      error: 'Unauthorized',
    });
  }
};
