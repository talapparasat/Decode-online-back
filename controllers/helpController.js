const sequelize = require('sequelize');
const db = require('../models');
const Op = sequelize.Op;

exports.ShowTask = async function (req, res) {
    let limit = 10;
    let query = req.query['query'];
    query = query.toLowerCase();
    db.Task.findAll({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('title')),
            {
                [Op.like]: '%' + query + '%'
            }
        ),
        attributes: ['id', 'title'],
        limit: limit,
    })
        .then(tasks =>
            res.json({msg: tasks})
        )
        .catch(err =>
            res.status(500).json({msg: err})
        )
};

exports.ShowQuestions = async function (req, res) {
	let limit = 10;
    let page = req.query['page'] ? req.query['page'] : 1;
    let query = req.query['query'] ? req.query['query'] : "";
    query = query.toLowerCase();
    db.Help.findAll({
        include: [{
            model: db.User,
            attributes: [],
            required: false,
            raw: true
        }],
        where:{ [Op.or]:[
            sequelize.where(
            sequelize.fn('lower', sequelize.col('TaskName')),
            {
                [Op.like]: '%' + query + '%'
            }),
            sequelize.where(
            sequelize.fn('lower', sequelize.col('description')),
            {
                [Op.like]: '%' + query + '%'
            })
         ]    },

        attributes: ['User.name', 'User.avatar','id', 'TaskName', 'description', 'taskId', 'userId', "description", "time"],
        raw: true,
        limit: limit,
        offset: limit * (page - 1)
    })
        .then(Help =>
            db.Help.findAll({
                include: [{
                    model: db.User,
                    attributes: [],
                    required: false,
                    raw: true
                }],
                where:{ [Op.or]:[
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('TaskName')),
                            {
                                [Op.like]: '%' + query + '%'
                            }),
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('description')),
                            {
                                [Op.like]: '%' + query + '%'
                            })
                    ]    },
                attributes: [[sequelize.fn('count', sequelize.col('Help.id')), 'total']
                ],
                raw: true,
                limit: limit,
                offset: limit * (page - 1)
            })
                .then(total => {
                    res.json({questions: Help, total: total[0].total})
                })
                .catch(err => {
                    res.status(500).json({msg: err})
                })
        )
        .catch(err => {
                console.log(err);
                res.status(500).json({msg: err})
        })
};

exports.ShowInfo = async function (req, res) {
       try {
           let id = req.params.id;
           
           let reply = await db.Help.findOne({
               where: {id:id},
               include:[{
                   model: db.User,
                   raw: true,
                   required:false,
                   attributes:[]
               }],
               attributes: ['User.name', 'User.avatar','id', 'TaskName', 'description', 'taskId', 'userId', "time"],
           });
           res.json(reply)
           }
       catch (e)
           {
               res.json("There was some error: " + e.message)
           }
};
exports.addQuestion = async function (req, res) {
    let question = {
        TaskName: req.body.TaskName,
        description: req.body.description,
        taskId: req.body.taskId ? req.body.taskId : null,
        userId: req.user.id
    };
    db.Help.create(question)
        .then(question =>
            res.json({msg: 'Success', question: question})
        )
        .catch(err =>
            res.status(500).json({msg: err})
        )
};