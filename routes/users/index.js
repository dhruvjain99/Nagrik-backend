const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('./../../controllers/users/users_controller');

router.get('/profile', passport.authenticate('jwt', {session: false}), users_controller.profile);

module.exports = router;