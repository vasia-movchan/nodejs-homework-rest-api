const jwt = require('jsonwebtoken');
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
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const payload = { _id: user._id, email: user.email };
    const secret = process.env.JWT_TOKEN;
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
