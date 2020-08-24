const express = require("express");
const lessonController = require("../../../controllers/adminControllers/lessonController");
const lessonRouter = express.Router();


lessonRouter.get("/",
    lessonController.getAllLessons);

lessonRouter.get("/:lessonId",
    lessonController.getLessonById);

lessonRouter.post("/",
    lessonController.addNewLesson);

lessonRouter.put("/:lessonId",
    lessonController.updateLesson);

lessonRouter.delete("/:lessonId",
    lessonController.deleteLesson);


module.exports = lessonRouter;
