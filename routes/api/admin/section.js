const express = require("express");
const sectionController = require("../../../controllers/adminControllers/sectionController");
const sectionRouter = express.Router();

const multer = require('../../../config/multer');
const upload = require('../../../middlewares/upload/uploadFile');


sectionRouter.get("/",
    sectionController.getAllSections);

sectionRouter.get("/prerequisite-options",
    sectionController.getSectionPrerequisiteOptions);

sectionRouter.get("/withPre/:id",
    sectionController.getAllSectionsWithPre);

sectionRouter.get("/:id",
    sectionController.getSectionById);

sectionRouter.post("/",
    multer.single('img'),
    upload({
        folderName: 'section',
        formName: 'img'
    }),
    sectionController.addNewSection);

sectionRouter.put("/:sectionId",
    multer.single('img'),
    upload({
        folderName: 'section',
        formName: 'img',
    }),
    sectionController.updateSection);

sectionRouter.post("/pre/:id",
    sectionController.addPrerequisiteToSection);

sectionRouter.delete("/pre/:id",
    sectionController.deletePrerequisiteFromSection);

sectionRouter.delete("/:sectionId",
    sectionController.deleteSection);


module.exports = sectionRouter;
