const { User, Event } = require('../models');
const { StatusCodes } = require('http-status-codes');

// this controller handles registering a user to an event
exports.registerUser = async (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.eventId;

  try {
    // Quick check: userId must be present in the request body
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing userId",
        data: {},
        error: "userId is required"
      });
    }

    // get event with registered users
    const event = await Event.findByPk(eventId, {
      include: {
        model: User,
        through: { attributes: [] }
      }
    });

    /* also check if the user exists */
    const user = await User.findByPk(userId);

    /* if either event or user doesn't exist, return 404 */
    if (!event || !user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        data: {},
        error: "User or Event not found"
      });
    }

    /* it don't allow registration for past events */
    if (new Date(event.datetime) < new Date()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Event is in the past",
        data: {},
        error: "Cannot register for past events"
      });
    }

    /* to avoid duplicate registrations */
    const alreadyRegistered = await event.hasUser(user);
    if (alreadyRegistered) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "Conflict",
        data: {},
        error: "User already registered"
      });
    }

    /* check if the event has reached full capacity */
    if (event.Users.length >= event.capacity) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Event full",
        data: {},
        error: "This event is already at full capacity"
      });
    }

    /* all checks passed, now register the user */
    await event.addUser(user);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User registered successfully",
      data: {},
      error: null
    });
  } catch (err) {
    /* it catch any server-side issues */
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server Error",
      data: {},
      error: err.message
    });
  }
};

/* this controller handles cancelling a user registration for an event */
exports.cancelRegistration = async (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.eventId;

  try {
    /* this ensure userId is included in request */
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing userId",
        data: {},
        error: "userId is required"
      });
    }

    // this look up both user and event
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    if (!event || !user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        data: {},
        error: "User or Event not found"
      });
    }

    /* to confirm the user is actually registered */
    const isRegistered = await event.hasUser(user);
    if (!isRegistered) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        data: {},
        error: "User is not registered for this event"
      });
    }

    /* remove the registration entry */
    await event.removeUser(user);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Registration cancelled successfully",
      data: {},
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
