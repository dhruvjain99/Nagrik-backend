const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('./../../controllers/users/users_controller');

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/xyz', passport.checkAuthentication, (req, res) => {return res.json({data: "congrats"})});
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), users_controller.createSession);
router.get('/profile', passport.checkAuthentication, users_controller.profile);

module.exports = router;