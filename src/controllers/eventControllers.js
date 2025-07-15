const { Event, User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

exports.createEvent = async (req, res) => {
  try {
    const { title, datetime, location, capacity } = req.body;

    if (!title || !datetime || !location || !capacity) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        data: {},
        error: "All fields are required (title, datetime, location, capacity)"
      });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid Capacity",
        data: {},
        error: "Capacity must be between 1 and 1000"
      });
    }

    const event = await Event.create({ title, datetime, location, capacity });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Event created successfully",
      data: { eventId: event.id },
      error: null
    });
  } catch (err) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server Error",
      data: {},
      error: err.message
    });
  }
};


exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
        through: { attributes: [] }
      }
    });

    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Event not found",
        data: {},
        error: "Invalid event ID"
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Event details retrieved",
      data: event,
      error: null
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server Error",
      data: {},
      error: err.message
    });
  }
};


exports.listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        datetime: {
          [Op.gt]: new Date()
        }
      },
      order: [
        ['datetime', 'ASC'],
        ['location', 'ASC']
      ]
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Upcoming events listed",
      data: events,
      error: null
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server Error",
      data: {},
      error: err.message
    });
  }
};


