const { User, Event } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { Op } = require("sequelize")

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        data: {},
        error: "Name, email, and password are required"
      });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "Conflict",
        data: {},
        error: "Email already registered"
      });
    }

    const user = await User.create({ name, email, password });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: { 
        user
      },
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

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
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


//Create an API that accepts a user ID and returns the number of events the user has registered for in the past month.

exports.noofEventsRegistered = async (req, res) => {
  try {
    const userId = req.params.id;

    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    const events = await Event.findAll({
      include: {
        model: User,
        where: { id: userId },
      },
      where: {
        datetime: {
          [Op.between]: [lastMonth, today]
        }
      }
    });

    return res.status(StatusCodes.OK).json({
      data: { count: events.length }
    });

  } catch (error) {
    return res.status(500).json({
      err: error
    });
  }
}
