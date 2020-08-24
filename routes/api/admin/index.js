const express = require("express");

const course = require('./course');
const section = require('./section');
const level = require('./level');
const lesson = require('./lesson');
const task = require('./task');
const feedback = require('./feedback');


const adminRouter = express.Router();

adminRouter.use("/course",
    course);

adminRouter.use("/section",
    section);

adminRouter.use("/level",
    level);

adminRouter.use("/lesson",
    lesson);

adminRouter.use("/task",
    task);

adminRouter.use("/feedback",
    feedback);


module.exports = adminRouter;
