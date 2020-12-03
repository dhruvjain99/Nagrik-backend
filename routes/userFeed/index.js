const express = require('express');
const router = express.Router();
const passport = require('passport');

const userFeed_controller = require('./../../controllers/userFeed/userFeed_controller');

router.get('/find', passport.checkAuthentication, userFeed_controller.findFeed);

module.exports = router;