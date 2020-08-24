const express = require("express");
const taskController = require("../../controllers/taskController");
const taskRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');


taskRouter.get("/:taskId",
    isAuth,
    taskController.getTaskById);

module.exports = taskRouter;