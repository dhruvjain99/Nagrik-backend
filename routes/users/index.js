const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('./../../controllers/users/users_controller');

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), users_controller.createSession);

router.get('/xyz', passport.checkAuthentication)

module.exports = router;