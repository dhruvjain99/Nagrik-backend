const express = require('express');
const router = express.Router();
const incidents_controller = require('./../../controllers/incidents/incidents_controller');
const passport = require('passport');

router.post('/newIncident', passport.authenticate('jwt', {session: false}), incidents_controller.newIncident);
router.post('/newIncidentVideo',passport.authenticate('jwt', {session: false}), incidents_controller.uploadIncidentVideo);
router.get('/find',  passport.authenticate('jwt', {session: false}), incidents_controller.findIncidents);
router.post('/updateVote', passport.authenticate('jwt', {session: false}),  incidents_controller.updateVotes);
module.exports = router;