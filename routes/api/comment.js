const express = require("express");
const commentController = require("../../controllers/commentController");
const commentRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

    commentRouter.get("/:typeId",
    commentController.getCommentsByType);


commentRouter.get("/auth/:typeId/:type",
    isAuth,
    commentController.getCommentsByType);

commentRouter.post("/add",
    isAuth,
    commentController.addComment);

commentRouter.put("/:id",
    isAuth,
    commentController.updateComment);

commentRouter.delete("/:id/:reply",
    isAuth,
    commentController.deleteComment);

commentRouter.get("/user/:id",
    isAuth,
    commentController.getCommentByUser);

module.exports = commentRouter;

