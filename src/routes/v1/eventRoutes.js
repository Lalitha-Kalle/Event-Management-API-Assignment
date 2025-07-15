const express = require('express');
const eventRouter = express.Router();
const { createEvent, getEventDetails, listUpcomingEvents, getEventStats } = require("../../controllers/eventControllers")

// this route is to create an event
eventRouter.post('/', createEvent);

// this route is to get details of an event + registered users
eventRouter.get('/:id', getEventDetails);

// this route is to list upcoming events with custom sort
eventRouter.get('/upcoming/list', listUpcomingEvents);

// this route is to get stats for a specific event
eventRouter.get('/:id/stats', getEventStats);

module.exports = eventRouter;
