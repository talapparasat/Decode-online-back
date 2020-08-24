const express = require("express");
const sectionController = require("../../controllers/sectionController");
const profileRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');


profileRouter.get("/:id",
    isAuth,
    sectionController.main);

profileRouter.get("/open/:sectionId",
    isAuth,
    sectionController.openSection);


module.exports = profileRouter;