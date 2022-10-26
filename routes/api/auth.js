const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const auth = require('../../middlewares/auth');

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.loginUser);

router.post('/logout', auth, ctrl.logoutUser);

module.exports = router;
