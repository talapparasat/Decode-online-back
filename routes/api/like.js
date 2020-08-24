const express = require("express");
const likeController = require("../../controllers/likeController");
const likeRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');



likeRouter.post("/",
    isAuth,
    likeController.likeComment);



module.exports = likeRouter;