const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('./../../controllers/users/users_controller');

router.get('/profile', passport.authenticate('jwt', {session: false}), users_controller.profile);
router.get('/userPosts',  passport.authenticate('jwt', {session: false}), users_controller.userPosts);
router.post('/updatePost',passport.authenticate('jwt', {session: false}), users_controller.updatePost);

module.exports = router;