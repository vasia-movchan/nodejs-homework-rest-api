const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

router.get('/current', auth, ctrl.getCurrent);

router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
