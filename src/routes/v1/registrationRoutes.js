const express = require('express');
const router = express.Router();
const { registerUser, cancelRegistration } = require("../../controllers/registrationControllers")

// Register a user to an event
router.post('/events/:eventId/register', registerUser);

// Cancel a user’s registration
router.delete('/events/:eventId/register', cancelRegistration);

module.exports = router;
