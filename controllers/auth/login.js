const User = require('../../models/user');
const bcrypt = require('bcrypt');

const { loginSchema } = require('../../schemas/users');

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Incorrect email' });
    }

    const user = await User.findOne({ email });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword) {
        return res
          .status(200)
          .json({ email: user.email, subscription: user.subscription });
      } else {
        return res.status(401).json({ message: 'Email or password is wrong' });
      }
    } else {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
