const express = require("express");
const feedBackController = require("../../controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.get("/",
    feedBackController.showFeedback);

module.exports = feedbackRouter;