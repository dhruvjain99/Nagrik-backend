const express = require('express');
const router = express.Router();
const home_controller = require('./../../controllers/home/home_api');

router.get('/', home_controller.index);

module.exports = router;