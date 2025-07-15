const express = require('express');
const eventRouter = express.Router();
const { createEvent } = require("../../controllers/eventControllers")

// this route is to create an event
eventRouter.post('/', createEvent);

// this route is to get details of an event + registered users
eventRouter.get('/:id', (req, res ) => {});

// this route is to list upcoming events with custom sort
eventRouter.get('/upcoming/list', (req, res ) => {});

// this route is to get stats for a specific event
eventRouter.get('/:id/stats', (req, res ) => {});

module.exports = eventRouter;
