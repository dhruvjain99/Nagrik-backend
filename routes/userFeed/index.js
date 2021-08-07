const express = require('express');
const router = express.Router();
const passport = require('passport');

const userFeed_controller = require('./../../controllers/userFeed/userFeed_controller');

router.get('/find',passport.authenticate('jwt', {session: false}), userFeed_controller.findFeed);
router.get('/countUsers',passport.authenticate('jwt', {session: false}), userFeed_controller.countUsers);

module.exports = router;