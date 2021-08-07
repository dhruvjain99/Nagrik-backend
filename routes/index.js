const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/login');

router.use('/home', require('./home'));
router.use('/users', require('./users'));
router.use('/userFeed', require('./userFeed'));
router.use('/userLocation', require('./userLocation'));
router.use('/incidents',require('./incidents'));
router.post('/login', loginController.createToken);

module.exports = router;