const express = require('express');
const router = express.Router();
const passport = require('passport');

const allEvents_controller = require('./../../controllers/allEvents/allEvents_controller');

router.get('/', passport.checkAuthentication, allEvents_controller.events);

module.exports = router;