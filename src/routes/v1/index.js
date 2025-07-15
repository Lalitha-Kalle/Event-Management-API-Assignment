const express = require('express');
const router = express.Router();

const eventRoutes = require('./eventRoutes');

// Mount /api/v1/events
router.use('/events', eventRoutes);

module.exports = router; // ✅ returns a router function
