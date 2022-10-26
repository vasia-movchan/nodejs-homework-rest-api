const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  return res.status(200).json({ email, subscription });
};

module.exports = getCurrent;
