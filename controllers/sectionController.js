const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const util = require('util');


exports.main = async function (req, res) {
    let userId = req.user.id;
    let sectionId = req.params.id;
    let courseId = await db.Section.findOne({
        where: {
            id: sectionId
        },
        include:[{
            model: db.Course,
            required: true,
            raw:true,
            attributes:['id']
        }],
        attributes:[]
    });

    let isSubscribed = await db.UserCourse.findOne({
        where: {
            userId: userId,
            courseId: courseId[0].id
        },
        raw: true
    });
    if(!isSubscribed){
        subscribe( courseId[0].id, userId);
    }
    db.Level.findAll({
        where: {sectionId},
        attributes: ['id', 'title', 'sectionId', 'order'],
        order: [['order', 'ASC']],
        raw: true
    }).then(levels => {
        // db.Section.findByPk(sectionId)
        //     .then(section => {
        //         if(section.prerequisities === 0) {
        //
        //         }
        //     });
        db.UserLevel.findOne({
            where: {
                sectionId: sectionId,
                userId: userId
            },
            attributes: ['level'],
            raw: true
        }).then(userLevel => {

            if(!isEmpty(userLevel)) {
                userLevel = userLevel.level;

                res.json({
                    levels: levels,
                    userLevel: userLevel,
                });

            } else {
                db.Section.findByPk(sectionId)
                    .then(section => {
                        db.Section.findByPk(section.prerequisite,
                            {
                                include: [{
                                    model:db.UserLevel,
                                    where: {
                                        userId: userId
                                    },
                                    // attributes: [],
                                    raw: true,
                                }],
                                where: {
                                    userId: userId,
                                },
                                raw: true,
                                // attributes: ['level']
                            })
                            .then(preSection => {
                                if(isEmpty(preSection)) {
                                    userLevel = -1;
                                } else if(preSection.level_count === preSection['UserLevels.level']) {
                                    userLevel = 0;
                                } else {
                                    userLevel = -1;
                                }

                                res.json({
                                    levels: levels,
                                    userLevel: userLevel,
                                });
                            })
                            .catch(err => res.json(err))
                    })
                    .catch(err => res.json(err))
                ;
            }
        })
            .catch(err => res.json(err))
        ;
    })
        .catch(err => res.json(err))
    ;
};


let subscribe = async(courseId, userId) => {
    db.Section.findOne({
            where: {
                prerequisite: 0,
                courseId: courseId,
            },
            attributes: ['id'],
            raw: true
        })
            .then(section => {
                db.UserLevel.create({
                    userId: userId,
                    sectionId: section.id,
                })
                    .then(createdRecord => {
                        db.UserCourse.create({
                            userId: userId,
                            courseId: courseId
                        })
                            .then(createdUserCourse => {
                                return true;
                            })
                            .catch(err => {(console.log(err));
                            return false});
                    })
                    .catch(err => {console.log(err);
                    return false});
            })

};

exports.openSection = async (req, res, next) => {

    const transaction = await db.sequelize.transaction();

    try {

        const userId = req.user.id;

        const sectionId = req.params.sectionId;

        const userLevel = await db.UserLevel.findOne({
            where: {
                userId,
                sectionId
            }
        });

        if(userLevel) {
            throw new APIError({
                message: 'У вас уже есть доступ к этому секцию'
            })
        }

        const section = await db.Section.findByPk(sectionId, {
            include: [{
                model: db.Section,
                as: 'PreSections',
                required: false,
                include: [{
                    model: db.UserLevel,
                    where: {
                        userId
                    },
                    required: false
                }]
            }]
        });

        if(!section) {
            throw new APIError({
                message: `Здесь нет секция с id '${sectionId}'`,
                status: httpStatus.NOT_FOUND
            })
        }

        const userCourse = await db.UserCourse.findOne({
            where: {
                userId,
                courseId: section.courseId
            },
            transaction
        });

        if(!userCourse) {
            throw new APIError({
                message: `Вы не подписаны на этот курс.`,
                status: httpStatus.BAD_REQUEST
            })
        }

        console.log(util.inspect(section.toJSON(), {showHidden: false, depth: null}));


        for (const preSection of section.PreSections) {
            if(preSection.UserLevels.length === 0) {
                throw new APIError({
                    message: `Вы еще не открывали секцию '${preSection.name}' которое является пререквизитом этой секция. Сперва открывайте его.`,
                    status: httpStatus.BAD_REQUEST
                })
            }

            if(preSection.UserLevels[0].level < preSection.level_count) {
                throw new APIError({
                    message: `Вы еще не открывали все уровни предыдущей секций. Заканчивайте их первым.`,
                    status: httpStatus.BAD_REQUEST
                })
            }
        }

        const levelsCount = await db.Level.count({
            where: {
                sectionId
            }
        });

        if(levelsCount === 0) {
            throw new APIError({
                message: `У этой секций еще нет уровней. Открывайте попозже`,
                status: httpStatus.BAD_REQUEST
            })
        }

        const firstLevel = await db.Level.findOne({
            where: {
                sectionId,
                order: 1
            }
        });

        if(firstLevel.price > userCourse.chakra) {
            throw new APIError({
                message: `У вас недостаточно монет для открытия этой секций`,
                status: httpStatus.BAD_REQUEST
            })
        }

        const newUserLevel = await db.UserLevel.create({
            userId,
            sectionId
        }, {transaction});

        userCourse.chakra = userCourse.chakra - firstLevel.price;
        await userCourse.save({transaction});

        await transaction.commit();

        res.send({success: true, newUserLevel})

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};