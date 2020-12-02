const express = require('express');
const router = express.Router();
const passport = require('passport');

const updateUserLocation_controller = require('./../../controllers/updateUserLocation/updateUserLocation_controller');

router.get('/', passport.checkAuthentication, updateUserLocation_controller.updateLocation);

module.exports = router;