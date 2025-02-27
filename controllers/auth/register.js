const User = require('../../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../../helpers/index');
const { BASE_URL } = process.env;

const { registerSchema } = require('../../schemas/users');

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: 'Verify email',
      html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click verify email</a>`,
    };

    await sendEmail(mail);

    res
      .status(201)
      .json({ email: result.email, subscription: result.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
