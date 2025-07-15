const express = require('express');
const userRouter = express.Router();
const { createUser, listUsers } = require("../../controllers/userControllers")


// this route is to create a user
userRouter.post('/', createUser);

// this route is to list all users 
userRouter.get('/', listUsers);

module.exports = userRouter;
