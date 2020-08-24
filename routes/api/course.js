const express = require("express");
const courseController = require("../../controllers/courseController");
const courseRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

courseRouter.get("/all/",
    courseController.getAllCourses);

courseRouter.get("/all/:id",
    courseController.courses);

courseRouter.get("/allSections/:id",
    courseController.courseSections);

courseRouter.get("/allSections/auth/:id",
    isAuth,
    courseController.courseSectionsAuth);

courseRouter.get("/:id",
    isAuth,
    courseController.main);

courseRouter.get("/:id/subscribe",
    isAuth,
    courseController.subscribe);

courseRouter.get("/:id",
    courseController.main);

courseRouter.post("/:id",
    isAuth,
    courseController.subscribe);

module.exports = courseRouter;