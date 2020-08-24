const sequelize = require('sequelize');
const multer = require('multer');

const db = require('../../models');
const isEmpty = require('../../validation/isEmpty');


exports.showFeedback = async function (req, res) {
    try {
        let feedback = await db.Feedback.findAll({

            include:[{
                model:db.User,
                attributes:[],
                required:false,
            }],

            attributes:['User.name', 'User.avatar', 'feedback'],
            required:false,
            raw: true
        });

        res.json(feedback);
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

exports.addFeedback = async function (req, res) {
    try {
        let userId = req.user.id;
        let FB = req.body.feedback;
        let feedback = {
            userId: userId,
            feedback: FB,
        };
        db.Feedback.create(feedback);
        res.json({msg: "Success"});
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

exports.deleteFeedback= async function (req, res) {

    try {
        let id = req.params.id;
        let isDeleted = await db.Feedback.destroy({
            where: {id}
        });
        res.json({success: isDeleted});
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

exports.updateFeedback = async function (req, res) {
    try {
        let id = req.params.id;
        let feedback = req.body.feedback;

        db.Feedback.update(
            {
                feedback: feedback,
            },
            {
                where: {id}
            }
        ).then(res.json({success: "Updated"})).catch(err => console.log(err));
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};
