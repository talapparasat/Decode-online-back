const express = require("express");
const commentController = require("../../../controllers/adminControllers/taskController");
const commentRouter = express.Router();


commentRouter.get("/",
    commentController.getAllTasks);

commentRouter.get("/:id",
    commentController.getTaskById);

commentRouter.post("/",
    commentController.addNewTask);

commentRouter.put("/:id",
    commentController.updateTask);

commentRouter.delete("/:id",
    commentController.deleteTask);


module.exports = commentRouter;