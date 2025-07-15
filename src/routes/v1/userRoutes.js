const express = require('express');
const userRouter = express.Router();


// this route is to create a user
userRouter.post('/', (req, res) => {res.send("hi")});

// this route is to list all users 
userRouter.get('/', (req, res) => {res.send("hi")});

module.exports = userRouter;
