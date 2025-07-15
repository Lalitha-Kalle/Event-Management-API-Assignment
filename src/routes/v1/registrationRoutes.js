const express = require('express');
const router = express.Router();

// Register a user to an event
router.post('/events/:eventId/register', (req, res) => {});

// Cancel a user’s registration
router.delete('/events/:eventId/register', (req, res) => {});

module.exports = router;
