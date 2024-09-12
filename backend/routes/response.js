const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

// Define the route for getting user responses
router.get('/getUserResponses', responseController.getUserResponses);

module.exports = router;