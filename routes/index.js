const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/home', require('./home'));
router.use('/users', require('./users'));
router.use('/userFeed', require('./userFeed'));
router.use('/userLocation', require('./userLocation'));
router.use('/incidents',require('./incidents'));
module.exports = router;