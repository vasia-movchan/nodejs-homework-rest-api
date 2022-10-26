const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const isValidId = require('../../middlewares/isValidId');
const auth = require('../../middlewares/auth');

router.get('/', auth, ctrl.getAllContacts);

router.get('/:contactId', auth, isValidId, ctrl.getContactById);

router.post('/', auth, ctrl.addContact);

router.delete('/:contactId', auth, isValidId, ctrl.deleteContact);

router.put('/:contactId', auth, isValidId, ctrl.updateContact);

router.patch('/:contactId/favorite', auth, isValidId, ctrl.updateStatusContact);

module.exports = router;
