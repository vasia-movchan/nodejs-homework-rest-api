const Contact = require('../../models/contacts');

const { contactSchema } = require('../../schemas/contacts');

const addContact = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
