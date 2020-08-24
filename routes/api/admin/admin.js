const express = require("express");
const adminController = require("../../../controllers/adminControllers/adminController");
const adminRouter = express.Router();


adminRouter.post("/login",
    adminController.login);


module.exports = adminRouter;