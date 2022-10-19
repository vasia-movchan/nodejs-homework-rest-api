const Contact = require('../../models/contacts');

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    result
      ? res.status(200).json({ message: 'contact deleted' })
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContacts;
