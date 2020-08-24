const express = require("express");
const feedbackController = require("../../../controllers/adminControllers/feedbackController");
const feedbackRouter = express.Router();


feedbackRouter.get("/",
    feedbackController.showFeedback);

feedbackRouter.post("/",
    feedbackController.addFeedback);

feedbackRouter.put("/:id",
    feedbackController.updateFeedback);

feedbackRouter.delete("/:id",
    feedbackController.deleteFeedback);


module.exports = feedbackRouter;