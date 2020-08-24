const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const LastActivities = require('../services/LastActivities');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const util = require('util');

exports.main = async function (req, res, next) {
    try {

        let lessonId = req.params.id;
        let userId = req.user.id;

        const lesson = await db.Lesson.findByPk(lessonId);

        if (!lesson) {
            throw Error('There is no such lesson')
        }

        const level = await db.Level.findByPk(lesson.levelId);
        const section = await db.Section.findByPk(level.sectionId);
        const course = await db.Course.findByPk(section.courseId);

        const preLessonInfo = await getPreLessonInfo(lesson, level, section);
        const nextLessonInfo = await getNextLessonInfo(lesson, level, section);

        let access = await isAccessible(userId, level, section);
        let accessMessage;
        let isFirstTimeAccess = false;

        if (!access) {
            try {
                await openLevel(userId, level, section);
                access = true;
                isFirstTimeAccess = true;
            } catch (err) {
                accessMessage = err.message
            }
        }

        const tasks = await getTasksByLesson(lesson, userId);

        if(access) {
            await LastActivities.saveLastActivity('lesson', userId, lessonId);
            await LastActivities.saveLastLesson(lessonId, userId);
        }

        res.send({
            id: lesson.id,
            title: lesson.title,
            numberOfLikes: lesson.number_of_likes,
            numberOfDislikes: lesson.number_of_dislikes,
            access,
            accessMessage,
            isFirstTimeAccess,
            content: access ? lesson.content : lesson.short_content,
            tasks,
            preLesson: preLessonInfo,
            nextLesson: nextLessonInfo,
            level,
            section,
            course
        })

    } catch (err) {
        next(err)
    }

//         db.Lesson.findByPk(lessonId)
//             .then(lesson => {
//                 db.Level.findByPk(lesson.levelId)
//                     .then(level => {
//                         console.log(userId);
//                         console.log(level.sectionId);
//                         order = level.order;
//                         db.UserLevel.findOne({
//                             where: {
//                                 userId: userId,
//                                 sectionId: level.sectionId
//                             }
//                         })
//                             .then(userLevel => {
//                                 console.log(userLevel);
//                                 console.log('Order:', order);
// //                            console.log('Level:', userLevel.level);
//
//                                 if (order <= userLevel.level) {
//                                     access = true;
//                                     contentType = "content"
//                                 } else {
//                                     access = false;
//                                     contentType = 'short_content';
//                                 }
//
//
//                                 db.Lesson.findByPk(lessonId, {
//                                     attributes: ['id', 'title', 'number_of_likes', 'number_of_dislikes', contentType, 'preLessonId'],
//                                     raw: true,
//                                 }).then(async result => {
//                                     let tasks = [];
//
//                                     let postLesson = null;
//                                     await db.Lesson.findOne({
//                                         where: {
//                                             preLessonId: lessonId
//                                         }
//                                     })
//                                         .then(lesson => {
//                                             if (lesson) {
//                                                 postLesson = lesson.id;
//                                             }
//                                         })
//                                         .catch(err => res.json("There was error while accessing lesson from database \n" + err));
//
//                                     result.postLessonId = postLesson;
//
//                                     if (access) {
//                                         db.Task.findAll({
//                                             where: {
//                                                 lessonId: lessonId
//                                             },
//                                             include: [{
//                                                 model: db.UserTask,
//                                                 where: {userId},
//                                                 required: false,
//                                                 attributes: [],
//                                                 raw: true
//                                             }],
//                                             attributes: ['id', 'title', 'description', 'requirements', 'content',
//                                                 'chakra', 'UserTasks.solution', 'UserTasks.date'],
//                                             raw: true,
//                                             // order:[['order', 'ASC']]
//                                         }).then(async tasks => {
//                                             try {
//                                                 LastActivities.saveLastActivity('lesson', userId, lessonId);
//                                                 let saved = await LastActivities.saveLastLesson(lessonId, userId);
//                                                 res.json({
//                                                     lesson: result,
//                                                     access: access,
//                                                     tasks: tasks,
//                                                     last: saved + 'dfd'
//                                                 });
//                                             } catch (e) {
//                                                 console.log(e)
//                                             }
//
//                                         }).catch(err => console.log(err));
//                                     } else {
//                                         res.json({lesson: result, access: access, tasks: tasks});
//                                     }
//                                 }).catch(err => console.log(err))
//                             })
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     });
//             }).catch(err => console.log(err))

};

exports.getLessons = async (req, res, next) => {
    try {

        const {levelId} = req.query;

        const lessons = await db.Lesson.findAll({
            where: {
                ...levelId ? {levelId} : {},
            },
            include: [{
                model: db.Level
            }],
            order: [
                [{model: db.Level}, 'order', 'ASC'],
                ['order', 'ASC']
            ],
            attributes: ['id', 'title', 'description', 'levelId']
        });

        res.send(lessons);

    } catch (err) {
        next(err)
    }
};


const isAccessible = async (userId, level, section) => {
    const userLevel = await db.UserLevel.findOne({
        where: {
            userId,
            sectionId: section.id
        }
    });

    if (!userLevel) {
        return false
    }

    if (userLevel.level < level.order) {
        return false
    }

    return true
};

const getPreLessonInfo = async (lesson, level, section) => {
    // TODO: get previous lesson info
    if (lesson.order > 1) {
        const preLesson = await db.Lesson.findOne({
            where: {
                order: lesson.order - 1,
                levelId: lesson.levelId
            }
        });

        if (preLesson) {
            return {
                id: preLesson.id,
                title: preLesson.title
            }
        } else {
            return {
                error: 'Database error. Please check if lesson orders correct!'
            }
        }
    }

    if (level.order === 1) {
        if (section.order === 1) {
            return {
                isFirstSection: true
            }
        }

        const prevSection = await db.Section.findOne({
            where: {
                courseId: section.courseId,
                order: section.order - 1
            }
        });

        return {
            isFirstLevel: true,
            prevSection: {
                id: prevSection.id,
                name: prevSection.name
            }
        }
    }

    const prevLevel = await db.Level.findOne({
        where: {
            sectionId: level.sectionId,
            order: level.order - 1
        }
    });

    const prevLesson = await db.Lesson.findOne({
        where: {
            levelId: prevLevel.id
        },
        order: [
            ['order', 'DESC']
        ]
    });

    return {
        isFirstLesson: true,
        id: prevLesson.id,
        title: prevLesson.title,
        prevLevel: {
            id: prevLevel.id,
            title: prevLevel.title
        }
    }
};

const getNextLessonInfo = async (lesson, level, section) => {
    // TODO: get next lesson info

    const maxOrder = await db.Lesson.findOne({
        attributes: [
            [sequelize.fn('MAX', sequelize.col('order')), 'max']
        ],
        where: {
            levelId: lesson.levelId
        },
        raw: true
    });

    if (lesson.order < maxOrder.max) {
        const nextLesson = await db.Lesson.findOne({
            where: {
                levelId: lesson.levelId,
                order: lesson.order + 1
            }
        });

        return {
            id: nextLesson.id,
            title: nextLesson.title
        }
    }

    if (lesson.order === maxOrder.max) {
        const nextLevel = await db.Level.findOne({
            where: {
                sectionId: level.sectionId,
                order: level.order + 1
            }
        });

        if (!nextLevel) {
            const nextSection = await db.Section.findOne({
                where: {
                    order: section.order + 1,
                    courseId: section.courseId
                }
            });

            if (!nextSection) {
                return {
                    isLastSection: true
                }
            }

            return {
                isLastLevel: true,
                nextSection: {
                    id: nextSection.id,
                    name: nextSection.name
                }
            }
        }

        const firstLessonOfNextLevel = await db.Lesson.findOne({
            where: {
                levelId: nextLevel.id,
                order: 1
            }
        });

        if (!firstLessonOfNextLevel) {
            return null
        }

        return {
            id: firstLessonOfNextLevel.id,
            title: firstLessonOfNextLevel.title,
            isFromNextLevel: true,
            nextLevel: {
                id: nextLevel.id,
                title: nextLevel.title
            }
        }
    }
};

const getTasksByLesson = async (lesson, userId) => {
    const tasks = await db.Task.findAll({
        attributes: [
            'id', 'title', 'description', 'chakra'
        ],
        include: [
            {
                model: db.UserTask,
                where: {userId},
                required: false,
                attributes: [],
                raw: true
            }
        ],
        where: {
            lessonId: lesson.id
        },
        order: [
            ['order', 'ASC'],
        ]
    });

    return tasks
};

const openLevel = async (userId, level, section) => {

    const transaction = await db.sequelize.transaction();

    try {

        const userCourse = await db.UserCourse.findOne({
            where: {
                userId,
                courseId: section.courseId
            },
            transaction
        });

        if (!userCourse) {
            throw new APIError({
                message: `Вы не подписаны на этот курс.`,
                status: httpStatus.BAD_REQUEST
            })
        }

        const userLevel = await db.UserLevel.findOne({
            where: {
                userId,
                sectionId: section.id
            },
            transaction
        });

        if (!userLevel) {
            throw new APIError({
                message: `Вы еще не открывали в эту секцию. Сперва закончите предыдущие секций.`,
                status: httpStatus.BAD_REQUEST
            })
        }

        if (userLevel.level < level.order - 1) {
            throw new APIError({
                message: `Вы не можете открыть этот уровень. Сперва открывайте предыдущие уровни.`,
                status: httpStatus.BAD_REQUEST
            })
        }

        if (userCourse.chakra < level.price) {
            throw new APIError({
                message: `У вас недостаточно чакра для открытия этого уровня`,
                status: httpStatus.BAD_REQUEST
            })
        }

        userCourse.chakra = userCourse.chakra - level.price;
        userLevel.level = userLevel.level + 1;

        await userCourse.save({transaction});
        await userLevel.save({transaction});

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err
    }
};

exports.unauthorized = async function (req, res) {
    let lessonId = req.params.id;
    db.Lesson.findByPk(lessonId, {
        attributes: ['id', 'title', 'number_of_likes', 'number_of_dislikes', 'short_content'],
        raw: true,
    }).then(result => {
        res.json({lessons: result, access: false});
    }).catch(err => console.log(err))
};
