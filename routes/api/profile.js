const express = require("express");
const profileController = require("../../controllers/profileController");
const profileRouter = express.Router();

const isAuth = require('../../middlewares/validators/isAuth');

const multer = require('../../config/multer');
const upload = require('../../middlewares/upload/uploadFile');


profileRouter.get("/",
    isAuth,
    profileController.main);

profileRouter.get("/mypage",
    isAuth,
    profileController.mypage);

profileRouter.post("/mypage",
    isAuth,
    multer.single('avatar'),
    upload({
        folderName: 'profile',
        formName: 'avatar'
    }),
    profileController.mypagePost);

profileRouter.get("/settings/email",
    isAuth,
    profileController.settingsEmailGet);

profileRouter.post("/settings/email",
    isAuth,
    profileController.settingsEmailPost);

profileRouter.post("/settings/password",
    isAuth,
    profileController.settingsPassword);


module.exports = profileRouter;