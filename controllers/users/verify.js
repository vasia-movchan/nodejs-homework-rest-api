const User = require('../../models/user');

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  return res.status(200).json({ message: 'Verification successful' });
};

module.exports = verify;
