const express = require('express');
const router = express.Router();

const eventRoutes = require('./eventRoutes');
const userRouter = require("./userRoutes")


router.use('/events', eventRoutes);
router.use('/users', userRouter);

module.exports = router; 
