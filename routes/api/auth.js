const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const auth = require('../../middlewares/auth');

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.loginUser);

router.get('/logout', auth, ctrl.logoutUser);

module.exports = router;
