const sequelize = require('sequelize');
const db = require('../models');
const LevelService = require('../services/LevelService');
const LastActivities = require('../services/LastActivities');
const Op = sequelize.Op;

exports.main = async function (req, res) {
    try {
        let userId = req.user.id;
        let levelId = req.params.id;

        let order;
        let access;

        let level;
        await db.Level.findByPk(levelId)
            .then(foundLevel => {
                if (!foundLevel) {
                    let error = new Error('There is no level with this id');
                    error.statusCode = 404;
                    throw error;
                }

                level = foundLevel;
            })
            .catch(err => {
                throw err
            });

        let isSubscribed = await subscribe(userId, level.sectionId);

        if (!isSubscribed) { throw new Error('There was error while subscribing to course. Please try later!')};

        order = level.order;

        let userLevel;

        await db.UserLevel.findOne({
            where: {
                userId: userId,
                sectionId: level.sectionId
            }
        })
            .then(foundUserLevel => userLevel = foundUserLevel)
            .catch(err => {
                throw new Error('There was error while accessing to userLevel, sectionId: ' + level.sectionId + ": " + err.message)
            });

        if(!userLevel) {
            access = false
        } else {
            access = order <= userLevel.level;
        }

        db.Lesson.findAll({
            where: {levelId},
            attributes: ['id', 'title', 'description', 'number_of_likes', 'number_of_dislikes'],
            raw: true,
            order:[['order', 'ASC']]
        }).then(result => {
            res.json({lessons: result, access: access});
        })
    } catch (e) {
        res.statusCode = e.statusCode || 500;
        res.send({error: 'There was some error: ' + e.message})
    }

};

exports.lessonByLevelId = async function (req, res) {
    let levelId = req.params.id;
    db.Lesson.findAll({
        where: {levelId},
        attributes: ['id', 'title', 'description', 'number_of_likes', 'number_of_dislikes', 'content'],
        raw: true,
        order:[['order', 'ASC']]
    }).then(result => {
        res.json({level: result});
    })
        .catch(err => console.log(err))

};

exports.openNextLevel = async function (req, res) {
    let userId = req.user.id;
    let levelId = req.params.id;

    db.Level.findByPk(levelId, {
        include: [{
            model: db.Section,
            raw: true,
            include: [
                {
                    model: db.UserLevel,
                    raw: true,
                    required: false,
                    where: {
                        userId: userId
                    }
                },
                {
                    model: db.Course,
                    raw: true,
                    include: [{
                        model: db.UserCourse,
                        raw: true,
                        where: {
                            userId: userId
                        }
                    }]
                }
            ]
        }],
        raw: true,

    })
        .then(async result => {

            if (result['Section.UserLevels.id'] !== null) {
                if (result.order - result['Section.UserLevels.level'] !== 1) {
                    res.json({error: 'Вы не можете купить этот уровень'})
                } else {

                    let isPurchased = await LevelService.buyLevel(levelId, userId);
                    if (isPurchased) {
                        let isLevelUpdated = await LevelService.updateLevel(result['Section.UserLevels.id']);
                        let isLevelActivity = await LastActivities.saveLastActivity('level', userId);
                        if (isLevelUpdated && isLevelActivity) {
                            res.json({success: true})
                        } else {
                            res.json({error: 'Try again'})
                        }
                    } else {
                        res.json({error: 'У вас недостаточно монет для открытия этого уровня'})
                    }
                }
            } else {
                db.UserLevel.findOne({
                    where: {
                        userId: userId,
                        sectionId: result['Section.prerequisite']
                    },
                    include: [{
                        model: db.Section
                    }],
                    raw: true
                })
                    .then(async preSection => {
                        if (preSection.level === preSection['Section.level_count'] && result.order === 1) {
                            let isPurchased = await LevelService.buyLevel(levelId, userId);
                            if (isPurchased) {
                                let isLevelCreated = await LevelService.createNewUserLevel(result['Section.id'], userId);
                                let isLevelActivity = await LastActivities.saveLastActivity('level', userId);
                                if (isLevelCreated && isLevelActivity) {
                                    res.json({success: true})
                                } else {
                                    res.json({error: 'Try again'})
                                }
                            } else {
                                res.json({error: 'У вас недостаточно монет для открытия этого уровня'})
                            }

                        } else {
                            res.json({error: 'Вы не можете купить этот уровень'})
                        }
                    }).catch(err => console.log(err));
            }

        })
        .catch(err => console.log(err))
};


exports.test = async function (req, res) {
    db.Section.findAll({
        include: [{
            model: db.SectionPrerequisites,
            required: false,
            raw: true,
            attributes: ['preSectionId'],

        }],
        where: {
            [Op.and]: [
                {courseId: 2},
                {'$SectionPrerequisites.preSectionId$': null}
            ]
        }
    })
        .then(sections => res.json(sections))
        .catch(err => res.json(err.message))
};

let testFunction = async (levelId) => {
    db.Level.findByPk(levelId)
        .then(level => {
            return level;
        })
        .catch(err => console.log(err.message));
};


// let subscribe = async (userId, sectionId) => {
//     [err, courseId] = await to(db.Course.findOne({
//         include: [{
//             model: db.Section,
//             raw: true,
//             attributes: [],
//             required: true,
//             where: {
//                 id: sectionId
//             }
//         }],
//         attributes: ['id']
//     }));
//
//
//     if (err) TE('There was some error while subscribing to course: ' + err.message, 500);
//
//     courseId = courseId.id;
//
//     console.log("CourseId: " + courseId);
//     console.log("before");
//     let isSubscribed = await db.UserCourse.findOne({
//         where: {
//             userId: userId,
//             courseId: courseId
//         },
//         raw: true
//     });
//
//     console.log(isSubscribed);
//
//     if (isEmpty(isSubscribed)) {
//         console.log("is empty");
//         db.Section.findOne({
//             where: {
//                 prerequisite: 0,
//                 courseId: courseId,
//             },
//             attributes: ['id'],
//             raw: true
//         })
//             .then(section => {
//                 db.UserLevel.create({
//                     userId: userId,
//                     sectionId: section.id,
//                 })
//                     .then(createdRecord => {
//                         db.UserCourse.create({
//                             userId: userId,
//                             courseId: courseId
//                         })
//                             .then(createdUserCourse => {
//                                 return true;
//                             })
//                             .catch(err => TE('There was some error while creating record in UserCourses table' + err.message, 500));
//                     })
//                     .catch(err => TE('There was some error while creating record in UserLevels table' + err.message, 500));
//             })
//     } else {
//         TE('You have already subscribed to this course', 400);
//     }
// };


let subscribe = async (userId, sectionId) => {
    let courseId;
    await db.Section.findByPk(sectionId)
        .then(section => courseId = section.courseId)
        .catch(err => {
            throw err
        });

    let userCourse;
    await db.UserCourse.findOne({
        where: {
            userId: userId,
            courseId: courseId
        }
    })
        .then(foundUserCourse => {
            userCourse = foundUserCourse;
        })
        .catch(err => {
            throw err
        });

    if (userCourse) {
        return true
    }

    await db.UserCourse.create({
        userId: userId,
        courseId: courseId
    })
        .then(createdUserCourse => {
            userCourse = createdUserCourse;
        })
        .catch(err => {
            throw new Error('There was error while subscribing to course. Please try later. ' + err)
        })

    let startSections;

    await db.Section.findAll({
        include: [{
            model: db.SectionPrerequisites,
            required: false,
            raw: true,
            attributes: ['preSectionId'],

        }],
        where: {
            [Op.and]: [
                {courseId: 2},
                {'$SectionPrerequisites.preSectionId$': null}
            ]
        }
    })
        .then(foundSections => startSections = foundSections)
        .catch(err => {
            throw new Error('There was error while accessing course sections. Please try later. ' + err.message)
        });


    startSections.map(async (startSection) => {
        await db.UserLevel.create({
            userId: userId,
            sectionId: startSection.id,
            level: 1
        })
            .then(createdUserLevel => console.log("UserLevel created for user " + userId + " and section " + startSection.id))
            .catch(err => {
                throw new Error('There was error while creating UserLevel record for user: ' + userId + " for section: " + startSection.id + ": " + err.message)
            })
    })

    return true


};





