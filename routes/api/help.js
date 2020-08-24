const express = require("express");
const helpController = require("../../controllers/helpController");
const helpRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

helpRouter.get("/",
    helpController.ShowTask);

helpRouter.get("/question",
    helpController.ShowQuestions);


helpRouter.get("/question/:id",
    helpController.ShowInfo);

helpRouter.post("/addQuestion",
    isAuth,
    helpController.addQuestion);


module.exports = helpRouter;
