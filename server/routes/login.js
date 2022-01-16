const jwt = require('jsonwebtoken');

const getUser = async (username) => {
  return { username, password: 'password123' };
};

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (user.password !== password) {
    return res.status(403).json({
      error: 'Invalid Login',
    });
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    // secure: true,
    // maxAge: 1000000,
    // signed: true
  });

  return res.json(200);
};
