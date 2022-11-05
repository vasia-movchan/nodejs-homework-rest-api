const jwt = require('jsonwebtoken');

const User = require('../models/user');

const secret = process.env.JWT_TOKEN;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const { _id } = jwt.verify(token, secret);
    const user = await User.findById(_id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
