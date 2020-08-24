const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');



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




