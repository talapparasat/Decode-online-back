
const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const like = require('./likeController');


exports.getCommentsByType = async function (req, res) {
    try {


        let userId = null;
        if (!isEmpty(req.user)) {
            userId = req.user.id;
        }
        let comment;
        let limit = 10;
        let page = req.query['page'] ? req.query['page'] : 1;
        let type = req.params.type;
        let typeId = req.params.typeId;
        comment = await db.CommentType.findAll({
            limit: limit,
            offset: limit * (page - 1),
            where: {
                type: type,
                typeId: typeId
            },
            required: false,
            include: [{
                model: db.Comment,
                required: false,
                attributes: ['id','content','like','dislike','date'],
                include:
                    [

                        {
                            model: db.Likes,
                            where:{userId},
                            attributes: [['type', 'liked']],

                            required: false
                        },
                        {
                            model: db.User,
                            attributes: ['name', 'avatar','id'],
                            required: false
                        },

                        {
                            model: db.Reply,
                            attributes: ['id','content','like','dislike','date'],
                            required: false,
                            include: [
                                {
                                    model: db.User,
                                    attributes: ['name','avatar', 'id'],
                                    required: false,
                                },
                                {
                                    model: db.Likes,
                                    where:{userId},
                                    attributes: [['type', 'liked']],
                                    required: false
                                }
                            ]

                        }

                    ],
            }],

        })
        ;


        res.json({comment: comment})
    } catch (e) {
        res.status(400).send("There was some error: " + e.message);

    }
};


exports.addComment = async function (req, res) {
    try {
        let existType = await eval('db.' + [req.body.type] + '.findOne({where:{id: req.body.typeId}})');
        if (existType != null) {
            let addcomment;
            let reply = req.body.reply ? req.body.reply: 0;
            let content = req.body.content;
            let userId = req.user.id;
            if(reply == 0){
                addcomment = await db.Comment.create({content:content,userId:userId});
                await db.CommentType.create({
                    typeId: req.body.typeId,
                    type: req.body.type,
                    commentId: addcomment.id
                });
            }
            else {
                addcomment = await db.Reply.create({content:content,userId:userId,commentId:reply});
            }
            res.json({msg: 'Success', comment: addcomment});
        } else {
            res.json({msg: 'That type doesn`t exist'})
        }
    } catch (e) {
        console.log(e);
        res.json("There was some error: " + e.message)
    }
};

exports.updateComment = async function (req, res) {
    try {
        let reply = req.body.reply;
        let type;
        let userId = req.user.id;
        let typeId = req.params.id;
        let result = [];
            if (reply==0)type='Comment';
            else type = 'Reply';
        let role = await db.User.findByPk(userId);
        let comment = await eval('db.'+type+'.findByPk(typeId)');
        if (role.role == "admin" || comment.userId == userId) {
            result = await eval('db.'+type+ '.update({content: req.body.content },{where:{id: typeId}})');
        }
        res.json(result);
    } catch (e) {
        res.json("There was some error: " + e.message)
    }

};


exports.deleteComment = async function (req, res) {
    try {
        let userId = req.user.id;
        let reply = req.params.reply;
        let type;
        let typeId = req.params.id;
            if (reply==0)type='Comment';
            else type = 'Reply';
        let role = await db.User.findByPk(userId);
        let comment = await eval('db.'+type+'.findByPk(typeId)');
        let result = [0];
        if (role.role == "admin" || comment.userId == userId) {
            result = await eval('db.'+type+'.destroy({where:{id: typeId}})');
        }
        res.json({result: result});
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

exports.getCommentByUser = async function (req, res) {
    db.Comment.findAll(
        {
            where: {
                userId: req.params.id
            }
        }).then(comments => res.json(comments))
        .catch((err) => {
            console.log(err);
        })
};


