const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');


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

// exports.subscribe = async function (req, res) {
//     let userId = req.user.id;
//     let courseId = req.params.id;
//
//     let isSubscribed = await db.UserCourse.findOne({
//         where: {
//             userId: userId,
//             courseId: courseId
//         },
//         raw: true
//     });
//
//     if (isEmpty(isSubscribed)) {
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
//                                 res.json({success: true});
//                             })
//                             .catch(err => res.json(err));
//                     })
//                     .catch(err => res.json(err));
//             })
//     } else {
//         res.json({error: 'You have already subscribed to this course'});
//     }
// };

exports.courses = async function (req, res) {
    let courseID = req.params.id;
    db.Course.findByPk(courseID).then(course => {
        db.Section.findAll({
            include: [{
                model: db.UserLevel,
                attributes: ['level', 'userId'],
                required: false
            }],
            order: ['order', 'ASC'],
            where: {courseID},
            attributes: ['name', 'description', 'img', 'level_count'],
            raw: true
        }).then(section => {
            res.json({
                courseId: courseID,
                video: course.video,
                courseName: course.name,
                courseDesc: course.description,
                sections: section
            });
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));


};

exports.getAllCourses = async function (req, res, next) {
    try {

        const courses = await db.Course.findAll({
            order: [['order', 'ASC']]
        });

        res.send(courses)
    } catch (err) {
        next(err)
    }
};


exports.courseSections = async function (req, res, next) {
    try {
        let courseId = req.params.id;

        let course = await db.Course.findByPk(courseId, {
            include: [{
                model: db.Section,
                attributes: ['id', 'name', 'description', 'img', 'defaultImage', 'level_count', 'courseId'],
                include: [
                    {
                        model: db.Section,
                        as: 'PreSections',
                        attributes: ['id', 'name'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: db.Level,
                        attributes: ['id', 'title']
                    }
                ]
            }],
            order: [
                ['order', 'ASC'],
                [{model: db.Section}, 'order', 'ASC'],
                [{model: db.Section}, {model: db.Level}, 'order', 'ASC'],
            ]
        });

        if(!course) {
            throw new APIError({
                message: 'There is no course with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        res.send(course);
    } catch (err) {
        next(err)
    }

    // db.Course.findByPk(courseID)
    //     .then(course => {
    //         db.Section.findAll({
    //             where: {courseId: courseID},
    //             //order:['order', 'ASC'],
    //
    //             // attributes: ['name', 'description', 'img', 'level_count'],
    //             raw: true
    //         }).then(async sections => {
    //
    //             for (let i = 0; i < sections.length; i++) {
    //
    //                 section = sections[i];
    //                 let x = [];
    //                 levels = await db.Level.findAll({
    //                     where: {sectionId: section.id},
    //                     order: [['order', 'ASC']],
    //                     // attributes:[['id','order','price','sectionId', 'title']]
    //                 })
    //                 for (let j = 0; j < levels.length; j++) {
    //                     if (levels[j].order == '1') {
    //                         access = true;
    //                     } else {
    //                         access = false;
    //                     }
    //                     levels[j].dataValues.access = access;
    //
    //
    //                 }
    //
    //                 sections[i].levels = levels;
    //
    //             }
    //
    //             res.json({
    //                 courseId: courseID,
    //                 video: course.video,
    //                 courseName: course.name,
    //                 courseDesc: course.description,
    //                 sections: sections
    //             });
    //         }).catch(err => console.log(err))
    //     }).catch(err => console.log(err));

};


exports.courseSectionsAuth = async (req, res, next) => {
    try {
        let courseId = req.params.id;
        let userId = req.user.id;

        const course = await db.Course.findByPk(courseId);

        await checkSubscription(userId, courseId);

        let sections = await db.Section.findAll({
            where: {
                courseId
            },
            include: [
                {
                    model: db.Level,
                    required: false,
                    include: [{
                        model: db.Lesson,
                        attributes: ['id', 'title', 'order'],
                        required: false
                    }]
                },
                {
                    model: db.UserLevel,
                    where: {
                        userId
                    },
                    required: false,
                },
                {
                    model: db.Section,
                    as: 'PreSections',
                    include: [
                        {
                            model: db.UserLevel,
                            where: {
                                userId
                            },
                            required: false,
                        },
                        {
                            model: db.Level,
                            required: false,
                            include: [{
                                model: db.Lesson,
                                attributes: ['id', 'title', 'order'],
                                required: false
                            }],
                        },
                    ]
                }
            ],
            order: [
                // [{model: db.Level}, {model: db.Lesson}, 'order', 'ASC'],
                [{model: db.Level}, 'order', 'ASC'],
                ['order', 'ASC'],
            ]
        });

        // res.send(sections);

        for (let i in sections) {

            if (sections[i].UserLevels.length === 0) {
                for (let j in sections[i].Levels) {
                    sections[i].Levels[j].setDataValue('access', false)
                }

                let canBuy = false;
                let isBreaked = false;
                for (let j in sections[i].PreSections) {
                    if (sections[i].PreSections[j].UserLevels.length === 0) {
                        isBreaked = true;
                        break;
                    }

                    if (sections[i].PreSections[j].Levels.length > sections[i].PreSections[j].UserLevels[0].level) {
                        isBreaked = true;
                        break;
                    }
                }

                if (!isBreaked) {
                    canBuy = true;
                }

                sections[i].setDataValue('canBuy', canBuy);

                continue;
            }

            sections[i].setDataValue('canBuy', false);

            const userLevel = sections[i].UserLevels[0].level;

            for (let j in sections[i].Levels) {
                sections[i].Levels[j].setDataValue('access', sections[i].Levels[j].order <= userLevel);
            }

        }

        res.send({
            ...course.toJSON(),
            sections
        });


        // db.Course.findByPk(courseID)
        //     .then(course => {
        //         db.Section.findAll({
        //             where: {courseId: courseID},
        //             // attributes: ['name', 'description', 'img', 'level_count'],
        //             raw: true
        //         }).then(async sections => {
        //
        //             for (let i = 0; i < sections.length; i++) {
        //                 let section = sections[i];
        //                 let x = [];
        //                 let levels = await db.Level.findAll({
        //                     where: {sectionId: section.id},
        //                     order: [['order', 'ASC']],
        //                     // attributes:[['id','order','price','sectionId', 'title']]
        //                 });
        //                 let userLevel = await db.UserLevel.findOne({
        //                     where: {
        //                         userId: userId,
        //                         sectionId: section.id
        //                     }
        //
        //                 });
        //
        //                 let prerequisities = await db.SectionPrerequisites.findAll({
        //                     where: {
        //                         postSectionId: section.id
        //                     }
        //                 });
        //
        //
        //                 console.log("----------")
        //                 console.log(userLevel);
        //                 for (let j = 0; j < levels.length; j++) {
        //                     access = true
        //                     // if ((userLevel !== null && levels[j].order <= userLevel.level) || (prerequisities.length === 1 && prerequisities[0].preSectionId===null && levels[j].order === 1) ) {
        //                     //     access = true;
        //                     // } else {
        //                     //     access = false;
        //                     // }
        //                     levels[j].dataValues.access = access;
        //
        //
        //                 }
        //
        //                 sections[i].levels = levels;
        //
        //             }
        //
        //             res.json({
        //                 courseId: courseID,
        //                 video: course.video,
        //                 courseName: course.name,
        //                 courseDesc: course.description,
        //                 sections: sections
        //             });
        //         }).catch(err => console.log(err))
        //     }).catch(err => console.log(err));

    } catch (err) {
        next(err)
    }
};

const checkSubscription = async (userId, courseId) => {
    const course = await db.Course.findByPk(courseId, {
        include: [{
            model: db.UserCourse,
            where: {
                userId
            },
            required: false
        }, {
            model: db.Section,
            include: [
                {
                    model: db.Section,
                    as: 'PreSections'
                },
                // {
                //     model: db.Level
                // }
            ],

            required: false
        }]
    });


    if (course && course.UserCourses && course.UserCourses.length === 0) {
        await db.UserCourse.create({
            courseId,
            userId
        });

        for (const section of course.Sections) {
            if (section.PreSections.length === 0) {
                await db.UserLevel.create({
                    userId,
                    sectionId: section.id
                })
            }
        }
    }
};


exports.subscribe = async (req, res, next) => {
    try {

        const courseId = req.params.id;
        const userId = req.user.id;

        const course = await db.Course.findByPk(courseId, {
            include: [{
                model: db.UserCourse,
                where: {
                    userId
                },
                required: false
            }, {
                model: db.Section,
                include: [
                    {
                        model: db.Section,
                        as: 'PreSections'
                    },
                    // {
                    //     model: db.Level
                    // }
                ],

                required: false
            }]
        });


        if (course && course.UserCourses && course.UserCourses.length === 0) {
            await db.UserCourse.create({
                courseId,
                userId
            });

            for (const section of course.Sections) {
                if (section.PreSections.length === 0) {
                    await db.UserLevel.create({
                        userId,
                        sectionId: section.id
                    })
                }
            }
        }

        res.send({success: true})
    } catch (err) {
        next(err)
    }
};