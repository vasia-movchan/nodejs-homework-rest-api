const Contact = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
