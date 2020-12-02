const express = require('express');
const router = express.Router();
const incidents_controller = require('./../../controllers/incidents/incidents_controller');
const passport = require('passport');

router.post('/new_incident', incidents_controller.newIncident);

module.exports = router;