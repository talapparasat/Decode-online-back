const express = require("express");
const levelController = require("../../controllers/levelController");
const levelRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

levelRouter.get("/:id",
    isAuth,
    levelController.main);

levelRouter.get("/all/:id",
    levelController.lessonByLevelId);

levelRouter.post("/openNext/:id",
    isAuth,
    levelController.openNextLevel);

levelRouter.post("/test/:id",
    isAuth,
    levelController.test);



module.exports = levelRouter;