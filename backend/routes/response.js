const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

// Define the route for getting user responses
router.get('/getUserResponses', responseController.getUserResponses);
router.get('/getAllUserResponses', responseController.getAllUserResponses);
router.get('/getMcqResponses', responseController.getMcqResponses);
module.exports = router;