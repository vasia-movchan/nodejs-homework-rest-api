const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.loginUser);

module.exports = router;
