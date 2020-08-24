const express = require("express");
const levelController = require("../../../controllers/adminControllers/levelController");
const levelRouter = express.Router();


levelRouter.get("/",
    levelController.getAllLevels);

levelRouter.get("/:levelId",
    levelController.getLevelById);

levelRouter.post("/",
    levelController.addNewLevel);

levelRouter.put("/:levelId",
    levelController.updateLevel);

levelRouter.delete("/:levelId",
    levelController.deleteLevel);


module.exports = levelRouter;