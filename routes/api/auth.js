const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');

router.post('/register', ctrl.registerUser);

module.exports = router;
