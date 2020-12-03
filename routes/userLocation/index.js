const express = require('express');
const router = express.Router();
const passport = require('passport');

userLocation_controller = require('../../controllers/userLocation/userLocation_controller');

router.get('/update', passport.checkAuthentication, userLocation_controller.updateLocation);

module.exports = router;