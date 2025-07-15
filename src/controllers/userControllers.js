const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');

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
