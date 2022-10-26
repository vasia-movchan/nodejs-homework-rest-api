const User = require('../../models/user');

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const result = await User.findById(_id);
    if (!result) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.headers.authorization = '';

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
