const express = require("express");
const testController = require("../../controllers/testController");
const testRouter = express.Router();
const isAuth = require('../../middlewares/validators/isAuth');

testRouter.post("/",
    isAuth,
    testController.main);

testRouter.post("/render_css",
    testController.rendering_css);

// testRouter.post("/renderJs",
//     testController.renderingCss);


module.exports = testRouter;