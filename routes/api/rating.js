const express = require("express");
const ratingController = require("../../controllers/ratingController");
const ratingRouter = express.Router();

ratingRouter.get("/tasks/:courseId",
    ratingController.tasks);

ratingRouter.get("/activity",
    ratingController.activity);

ratingRouter.get("/activity/:courseId",
    ratingController.activityByCourse);

module.exports = ratingRouter;