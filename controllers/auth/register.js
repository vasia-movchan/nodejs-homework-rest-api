const User = require('../../models/user');

const { registerSchema } = require('../../schemas/users');

const registerUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const result = await User.create(req.body);
    res.status(201).json({ email: result.email });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
