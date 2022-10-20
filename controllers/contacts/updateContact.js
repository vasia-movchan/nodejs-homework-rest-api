const Contact = require('../../models/contacts');
const { contactSchema } = require('../../schemas/contacts');

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
