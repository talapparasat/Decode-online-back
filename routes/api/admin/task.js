const express = require("express");
const taskController = require("../../../controllers/adminControllers/taskController");
const taskRouter = express.Router();


taskRouter.get("/",
    taskController.getAllTasks);

taskRouter.get("/:taskId",
    taskController.getTaskById);

taskRouter.post("/",
    taskController.addNewTask);

taskRouter.put("/:taskId",
    taskController.updateTask);

taskRouter.delete("/:taskId",
    taskController.deleteTask);


module.exports = taskRouter;