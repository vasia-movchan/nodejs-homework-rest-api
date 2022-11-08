const User = require('../../models/user');

const { verifyEmailSchema } = require('../../schemas/users');

const { sendEmail } = require('../../helpers/index');

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const { error } = verifyEmailSchema.validate(email);
  if (error) {
    return res.status(400).json({ message: 'missing required field email' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: 'Verification has already been passed' });
  }

  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(mail);

  return res.status(200).json({ message: 'Verification email sent' });
};

module.exports = resendEmail;
