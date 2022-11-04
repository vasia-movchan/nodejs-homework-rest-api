const fs = require('fs/promises');
const path = require('path');
const User = require('../../models/user');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id, email } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const userAvatarsDir = `${avatarsDir}/${email}`;

  await fs.mkdir(userAvatarsDir, { recursive: true });

  const resultUpload = path.join(userAvatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const resizeAvatar = await Jimp.read(resultUpload);
  await resizeAvatar.resize(250, 250).write(resultUpload);
  const avatarURL = path.join('avatars', email, originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
