const express = require("express");
const userController = require("../../controllers/userController");
const userRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

userRouter.post("/register",
    userController.register);

userRouter.post("/login",
    userController.login);

userRouter.post("/current",
    isAuth,
    userController.current);

userRouter.post("/createStatus", userController.createStatus);

module.exports = userRouter;