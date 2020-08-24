const sequelize = require('sequelize');
const db = require('../models');
const Op = sequelize.Op;
const bcrypt = require('bcryptjs');
const validateLoginInput = require('../validation/login');
const removeFile = require('../helpers/removeFile');

exports.main = async function (req, res) {
    let userid = req.user.id;
    db.User.findByPk(
        req.user.id,
        {
            include: [{
                model: db.Status,
                attributes: [],
            }],
            attributes: ['id', 'name', 'avatar', 'statusId', 'Status.status'],
            raw: true
        }).then(user => {
        db.UserLevel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('level')), 'level'],
                'Section->Course.name',
                'Section->Course->UserCourses.chakra'
            ],
            include: [{
                model: db.Section,
                include: [{
                    model: db.Course,
                    required: false,
                    attributes: [],
                    include: [{
                        model: db.UserCourse,
                        required: false,
                        attributes: [],
                        where: {userId: userid}
                    }],
                }],
                required: false,
                attributes: [],
            }],

            where: {userId: userid},
            group: ['Section->Course.name', 'Section->Course->UserCourses.chakra'],
            raw: true,
        }).then(result => {
            db.LastTask.findAll({
                include: [{
                    model: db.Task,
                    attributes: []
                }],
                where: {
                    userId: req.user.id
                },
                order: [
                    ['time', 'DESC']
                ],
                attributes: ['Task.title', 'Task.description', 'Task.chakra'],
                raw: true
            }).then(task => {
                db.LastLesson.findAll({
                    include: [{
                        model: db.Lesson,
                        attributes: []
                    }],
                    where: {
                        userId: req.user.id
                    },
                    order: [
                        ['time', 'DESC']
                    ],
                    attributes: ['Lesson.title', 'Lesson.description'],
                    raw: true
                }).then(lesson => {
                    res.json({
                        UserInfo: user,
                        levels: result,
                        Tasks: task,
                        Lessons: lesson
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))

};

exports.mypage = function (req, res) {
    db.User.findByPk(
        req.user.id,
        {
            include: [{
                model: db.Status,
                attributes: ['id', 'status'],
            }],


            attributes: ['name', 'role'],
            raw: true
        }
    ).then(user => {
        db.UserLevel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('level')), 'level'],
                'Section->Course.name',
                'Section->Course->UserCourses.chakra'
            ],
            include: [{
                model: db.Section,
                include: [{
                    model: db.Course,
                    required: false,
                    attributes: [],
                    include: [{
                        model: db.UserCourse,
                        required: false,
                        attributes: [],
                        where: {userId: req.user.id}
                    }],
                }],
                required: false,
                attributes: [],
            }],

            where: {userId: req.user.id},
            group: ['Section->Course.name', 'Section->Course->UserCourses.chakra'],
            raw: true,
        }).then(chakra => {
            res.json({
                name: user.name,
                status: user['Status.status', 'Status.id'],
                role: user.role,
                chakra
            })
        });
    }).catch(err => console.log(err))

};

exports.mypagePost = async (req, res, next) => {

    const transaction = await db.sequelize.transaction();

    try {

        const {name, statusId, avatar} = req.body;

        const user = await db.User.findByPk(req.user.id, {transaction});

        user.name = name;
        user.statusId = statusId;

        let oldImg;

        if(avatar) {
            oldImg = user.avatar;
            user.avatar = avatar;
        }

        await user.save({transaction});

        await transaction.commit();
        await removeFile(oldImg);
        res.send({success: true})
    } catch (err) {
        await transaction.rollback();
        await removeFile(req.body.avatar);
        next(err)
    }
};

exports.settingsEmailGet = function (req, res) {
    db.User.findByPk(req.user.id)
        .then(user => {
            res.json(user.email);
        }).catch(err => console.log(err));
};

exports.settingsEmailPost = async function (req, res) {
    let users = await db.User.findAll({
        where: {
            email: req.body.email,
        }
    })
    if (users.length == 0) {
        db.User.update(
            {
                email: req.body.email,
            },
            {
                where: {
                    id: req.user.id
                }
            }).then(res.json({msg: 'Вы успешно сменили email'}))
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({msg: 'Адрес электронной почты уже существует.'})
    }
};

exports.settingsPassword = function (req, res) {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    db.User.findByPk(req.user.id)
        .then(user => {
            bcrypt.compare(oldPassword, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newPassword, salt, (err, hash) => {
                                if (err) throw err;
                                newPassword = hash;
                                db.User.update(
                                    {
                                        password: newPassword,
                                    },
                                    {
                                        where: {
                                            id: req.user.id
                                        }
                                    }).then(res.json({msg: 'success'}))
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            })
                        })
                    } else {
                        let errors = {password: "password incorrect"};
                        return res.status(400).json(errors);
                    }
                })
        }).catch(err => console.log(err))
};
