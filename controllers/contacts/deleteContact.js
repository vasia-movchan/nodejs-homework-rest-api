const Contact = require('../../models/contacts');

const deleteContacts = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({
      _id: contactId,
      owner: _id,
    });

    result
      ? res.status(200).json({ message: 'contact deleted' })
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContacts;
