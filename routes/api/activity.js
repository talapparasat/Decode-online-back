const express = require("express");
const activityController = require("../../controllers/activityController");
const activityRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');


activityRouter.get("",
    activityController.all);

activityRouter.get("/myactivity",
    isAuth,
    activityController.myactivity);

activityRouter.get("/:id",
    isAuth,
    activityController.main);


module.exports = activityRouter;
