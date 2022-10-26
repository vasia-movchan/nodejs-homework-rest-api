const Contact = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const result = await Contact.find({ owner: _id }).populate(
      'owner',
      '_id email'
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
