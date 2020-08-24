const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const Op = sequelize.Op;


exports.main = async function (req, res) {
    let userId = req.user.id;
    let courseId = req.params.id;

    db.Section.findAll({
        include: [{
            model: db.UserLevel,
            where: {userId},
            attributes: ['level', 'userId'],
            required: false
        }],
        where: {courseId},
        attributes: ['name', 'description', 'img', 'level_count'],
        raw: true
    })
        .then(result => {
            res.json(result);
        }).catch(err => console.log(err));
};

exports.all = async function (req, res) {
    let query = req.query['query'];
    let limit = 10;
    let page = req.query['page'] ? req.query['page'] : 1;

    if (query === undefined || query === "undefined" || query.length === 0) {
        db.LastActivity.findAll({
            attributes: [
                ['type', 'Type'], ['info', 'Info'], ['time', 'Time'],
            ],
            include: [{
                model: db.User,
                attributes: ['id', 'name', 'avatar'],
                required: true
            }],
            order: [
                ['time', 'DESC']
            ],
            limit: limit,
            offset: limit * (page - 1)
        }).then(activites => {
            db.LastActivity.findAll({
                attributes:[[sequelize.fn('count', sequelize.col('id')), 'total']]
            }).then(result => {
                let total =result[0].dataValues.total;
                res.json({total, activites});
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

    }
    else
    {
        query = query.toLowerCase();
        db.LastActivity.findAll({
            attributes: [
                ['type', 'Type'], ['info', 'Info'], ['time', 'Time']
            ],
            include: [{
                model: db.User,
                attributes: ['id', 'name', 'avatar'],
                required: true,
                where: sequelize.where(
                    sequelize.fn('lower', sequelize.col('User.name')),
                    {
                        [Op.like]: '%' + query + '%'
                    }
                )
            }],
            order: [
                ['time', 'DESC']
            ],
            limit: limit,
            offset: limit * (page - 1)
        }).then(activites => {
            db.LastActivity.findAll({
                attributes:[[sequelize.fn('count', sequelize.col('id')), 'total']]
            }).then(result => {
                let total =result[0].dataValues.total;
                res.json({total, activites});
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
    };

exports.myactivity = async function (req, res) {
    let limit = 10;
    let page = req.query['page'] ? req.query['page'] : 1;
            db.LastActivity.findAll({
                attributes: [
                    ['type', 'Type'], ['info', 'Info'], ['time', 'Time'],
                    'User.name', 'User.avatar'
                ],
                include: [{
                    model: db.User,
                    attributes: [],
                    required: false,
                    include: [{
                        model: db.UserLevel,
                        attributes: [],
                        required: false,
                        include: [{
                            model: db.Section,
                            attributes: [],
                            required: false,
                            include: [{
                                model: db.Course,
                                attributes: [],
                                required: false,
                                include: [{
                                    model: db.UserCourse,
                                    attributes: [],
                                    required: false
                                }],
                            }],
                        }],
                    }],
                }],
                where: {userId: req.user.id},
                required: false,
                order: [
                    ['time', 'DESC']
                ],
                raw: true,
                subQuery: false,
                limit: limit,
                offset: limit * (page - 1)
            }).then(myactivity => {
                db.LastActivity.findAll({
            attributes: [[sequelize.fn('count', sequelize.col('id')), 'total'],
            ],
                where: {userId: req.user.id},

                }).then(result=>
                    {
                        let total =result[0].dataValues.total;
                        res.json({total, myactivity});
                    }).catch(err => console.log(err));


            }).catch(err => console.log(err));


};
