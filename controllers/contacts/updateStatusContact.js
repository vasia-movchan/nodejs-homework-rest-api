const Contact = require('../../models/contacts');
const { updateStatusSchema } = require('../../schemas/contacts');

const updateStatusContact = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: _id,
      },
      req.body,
      {
        new: true,
      }
    );
    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
