const express = require("express");
const courseController = require("../../../controllers/adminControllers/courseController");
const courseRouter = express.Router();

const multer = require('../../../config/multer');
const upload = require('../../../middlewares/upload/uploadFile');


courseRouter.get("/",
    courseController.getAllCourses);

courseRouter.get("/withSections",
    courseController.getAllCoursesWithSections);

courseRouter.get("/:courseId",
    courseController.getCourseById);

courseRouter.post("/",
    multer.single('img'),
    upload({
        folderName: 'course',
        formName: 'img'
    }),
    courseController.addNewCourse);

courseRouter.put("/:courseId",
    multer.single('img'),
    upload({
        folderName: 'course',
        formName: 'img'
    }),
    courseController.updateCourse);

courseRouter.delete("/:courseId",
    courseController.deleteCourse);

module.exports = courseRouter;