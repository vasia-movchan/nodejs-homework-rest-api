const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const auth = require('../../middlewares/auth');

router.get('/current', auth, ctrl.getCurrent);

module.exports = router;
