const express = require("express");
const lessonController = require("../../controllers/lessonController");
const lessonRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

// @route   GET api/lesson/
// @desc    Return lesson by specified ID. Return lesson with full content if user level is corresponds.
// @params   name
//          description
//          img
//          courseId
//          prerequisites - array of section prerequisites ids
// @access  Private
lessonRouter.get("/",
    lessonController.getLessons);

lessonRouter.get("/:id",
    isAuth,
    lessonController.main);

lessonRouter.get("/:id/unauthorized",
    lessonController.unauthorized);

module.exports = lessonRouter;