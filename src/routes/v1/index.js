const express = require('express');
const router = express.Router();

const eventRoutes = require('./eventRoutes');
const userRouter = require("./userRoutes")
const registrationRouter = require("./registrationRoutes")


router.use('/events', eventRoutes);
router.use('/users', userRouter);
router.use("/", registrationRouter)

module.exports = router; 
