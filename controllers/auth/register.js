const User = require('../../models/user');
const bcrypt = require('bcrypt');

const { registerSchema } = require('../../schemas/users');

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ email, password: hashPassword });

    res
      .status(201)
      .json({ email: result.email, subscription: result.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
