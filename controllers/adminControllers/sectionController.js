const sequelize = require('sequelize');
const multer = require('multer');
const db = require('../../models');
const isEmpty = require('../../validation/isEmpty');
const NotFoundError = require('../../errors/NotFoundError');
const Op = sequelize.Op;
const orderNormalizer = require('../../helpers/orderNormalizer');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const fs = require('fs');
const removeFile = require('../../helpers/removeFile');


// @route   GET api/admin/section?courseId=
// @desc    Return all sections from database if courseId query wasn't specified
//          Return all sections of specific course if courseId query was specified.
// @access  Private-Admin
exports.getAllSections = async function (req, res, next) {
    try {

        const sections = await db.Section.findAll({
            where: {
                ...req.query['courseId'] ? {courseId: req.query['courseId']} : {}
            },
            include: [
                {
                    model: db.Section,
                    as: 'PreSections',
                },
                {
                    model: db.Course,
                }
            ],
            order: [
                ['courseId', 'ASC'],
                ['order', 'ASC']
            ]
        });

        res.json(sections);

    } catch (err) {
        next(err)
    }
};


// @route   GET api/admin/section/prerequisiteOptions?courseId=&sectionId=
// @desc    Return list of sections that can be prerequisite to given section if sectionId is specified.
//          If sectionId isn't specified return all sections in course with 'courseId'
// @access  Private-Admin
exports.getSectionPrerequisiteOptions = async function (req, res, next) {
    try {

        const {courseId, sectionId} = req.query;

        console.log({sectionId});

        const sections = await db.Section.findAll({

            ...sectionId ? {
                include: [
                    {
                        model: db.SectionPrerequisites,
                        as: 'PreSectionsRecords',
                        where: {
                            preSectionId: sectionId
                        },
                        required: false,
                        attributes: []
                    }
                ],
            } : {},
            where: {
                courseId,
                ...sectionId ? {
                    id: {
                        [Op.ne]: sectionId
                    },
                    // PreSectionsRecords: [],
                    '$PreSectionsRecords.preSectionId$': null,
                    // '$PreSectionsRecords&': {
                    //     [Op.or]: [
                    //         {
                    //             [Op.ne]: sectionId
                    //         },
                    //         {
                    //             [Op.eq]: null
                    //         }
                    //     ]
                    // }
                } : {}
            },
            attributes: ['id', 'name'],
            order: [
                ['order', 'ASC']
            ]
        });

        res.json(sections);

    } catch (err) {
        next(err)
    }
};


// @route   GET api/admin/section/withPre/:id
// @desc    Takes sectionId and returns all sections with prerequisites
//          from course which this section belongs
// @access  Private-Admin
exports.getAllSectionsWithPre = async function (req, res, next) {
    try {
        let sectionId = req.params.id;

        let section = await db.Section.findByPk(sectionId);

        let sections = await db.Section.findAll({
            where: {
                courseId: section.courseId
            },
            include: [{
                model: db.SectionPrerequisites,
                attributes: ['preSectionId']
            }]
        });

        res.json(sections)

    } catch (err) {
        next(err)
    }
};


// @route   GET api/admin/section/:id
// @desc    Returns section by id
// @access  Private-Admin
exports.getSectionById = async function (req, res) {
    try {

        let sectionId = req.params.id;
        let section = await db.Section.findByPk(sectionId);

        res.json(section);

    } catch (err) {
        next(err)
    }
};


// @route   POST api/admin/section/:id
// @desc    Creates new section
// @params   name
//          description
//          img
//          courseId
//          prerequisites - array of section prerequisites ids
// @access  Private-Admin
exports.addNewSection = async function (req, res, next) {

    let transaction = await db.sequelize.transaction();

    try {

        const {name, description, img, courseId} = req.body;
        let {prerequisites, order} = req.body;

        try {
            prerequisites = JSON.parse(req.body.prerequisites);
        } catch (e) {
            prerequisites = [];
        }

        const course = await db.Course.findByPk(courseId, {transaction});
        if (!course) {
            throw new APIError({
                message: 'Course with specified courseId not found',
                status: httpStatus.UNPROCESSABLE_ENTITY
            })
        }

        await checkPrerequisitesExistence(prerequisites, courseId, transaction);

        order = await orderNormalizer.normalizeOrdersOnCreate(db.Section, order, {courseId}, transaction);

        let section = await db.Section.create({
            name,
            description,
            img,
            courseId,
            order
        }, {transaction});

        const result = await setSectionPrerequisites(section.id, prerequisites, transaction);

        await transaction.commit();

        res.json({
            section,
            prerequisites: result
        });

    } catch (err) {
        await transaction.rollback();
        await removeFile(req.body.img);
        next(err);
    }
};


// @route   PUT api/admin/section/:id
// @desc    Updates existing new section
// @params   sectionId - as param from url
//          name
//          description
//          img
//          courseId
// @access  Private-Admin
exports.updateSection = async function (req, res, next) {

    let transaction = await db.sequelize.transaction();

    try {

        const {name, description, img, courseId, order} = req.body;
        let {prerequisites} = req.body;

        const {sectionId} = req.params;

        try {
            prerequisites = JSON.parse(req.body.prerequisites);
        } catch (e) {
            prerequisites = [];
        }

        const section = await db.Section.findByPk(sectionId);

        if (!section) {
            throw new APIError({
                message: 'There is no section with this id',
                status: httpStatus.NOT_FOUND,
            });
        }

        const course = await db.Course.findByPk(courseId);

        if (!course) {
            throw new APIError({
                message: 'There is no course with this id',
                status: httpStatus.NOT_FOUND,
            });
        }

        if (Array.isArray(prerequisites) && prerequisites.length !== 0) {
            await checkPrerequisitesExistence(prerequisites, courseId, transaction);
            await checkPrerequisitesConflict(prerequisites, courseId, sectionId, transaction)
        }

        const updatedPrerequisites = await setSectionPrerequisites(sectionId, prerequisites, transaction);

        await orderNormalizer.normalizeOrdersOnUpdate(db.Section, section, order, {courseId}, transaction);

        section.name = name;
        section.description = description;
        section.courseId = courseId;

        let oldImg;

        if (img) {
            oldImg = section.img;
            section.img = img;
        }

        await section.save({transaction});

        await transaction.commit();
        await removeFile(oldImg);
        res.send({section, updatedPrerequisites});

    } catch (err) {
        await transaction.rollback();
        await removeFile(req.body.img);
        next(err)
    }
};


// @route   DELETE api/admin/section/pre/:id
// @desc    Deletes section
// @params  sectionId - as param from url
// @access  Private-Admin
exports.deleteSection = async function (req, res, next) {

    let transaction = await db.sequelize.transaction();

    try {
        const {sectionId} = req.params;

        const section = await db.Section.findByPk(sectionId, {transaction});

        if (!section) {
            throw new APIError({
                message: 'There is no such section with id specified',
                status: httpStatus.UNPROCESSABLE_ENTITY
            })
        }

        const img = section.img;

        const levelsCount = await db.Level.count({
            where: {
                sectionId
            },
            transaction
        });

        if (levelsCount !== 0) {
            throw new APIError({
                message: 'This section has levels. Delete them first',
                status: httpStatus.CONFLICT
            })
        }

        const postSections = await db.SectionPrerequisites.count({
            where: {
                preSectionId: sectionId
            },
            transaction
        });

        if (postSections !== 0) {
            throw new APIError({
                message: 'This section has some dependent. Remove these dependencies first',
                status: httpStatus.CONFLICT
            })
        }

        await orderNormalizer.normalizeOrdersOnDelete(db.Section, section.order, {courseId: section.courseId}, transaction);
        await section.destroy({transaction});

        await removeFile(img);

        await transaction.commit();
        removeFile(section.img);
        res.send({success: true});

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};


// @route   PUT api/admin/section/pre/:id
// @desc    Adds new prerequisite to section
// @params   sectionId - as param from url
//          prerequisite - section id to make prerequisite to given section
// @access  Private-Admin
exports.addPrerequisiteToSection = async function (req, res) {
    let sectionId = req.params.id;
    let prerequisite = req.body.prerequisite;

    db.SectionPrerequisites.create({
        preSectionId: prerequisite,
        postSectionId: sectionId
    }).then(result => {
        res.json({success: 'true', result});
    }).catch(err => {
        let error = new Error('There was some error while adding prerequisite to section');
        error.statusCode = 500;
        res.send({error: error});
    });
};


// @route   DELETE api/admin/section/pre/:id
// @desc    Deletes section prerequisite
// @params   sectionId - as param from url
//          prerequisite - id of section which prerequisite to given secition
// @access  Private-Admin
exports.deletePrerequisiteFromSection = async function (req, res) {
    let sectionId = req.params.id;
    let prerequisite = req.body.prerequisite;

    db.SectionPrerequisites.destroy({
        where: {
            preSectionId: prerequisite,
            postSectionId: sectionId
        }
    }).then(result => {
        res.json({success: 'true'});
    }).catch(err => {
        let error = new Error('There was some error while deleting prerequisite from section');
        error.statusCode = 500;
        res.send({error: error});
    });
};


// @desc    checks is given prerequisite belongs to course
// @purpose checks prerequisite existence in section's course
// @params  prerequisite - section to check existence
//          courseId - course id of section
const checkPrerequisitesExistence = async function (prerequisites, courseId, transaction) {
    const sections = await db.Section.findAll({
        where: {
            courseId
        },
        attributes: ['id'],
        transaction
    });

    const sectionsIds = sections.map(section => section.id);

    for (const sectionId of prerequisites) {
        console.log({sectionId});
        if (!sectionsIds.includes(sectionId)) {
            throw new APIError({
                message: `The section with id "${sectionId}" specified in prerequisites not belongs to course with id "${courseId}"`,
                status: httpStatus.CONFLICT
            })
        }
    }
};


// @desc    checks if given prerequisites belongs to course
// @purpose checks prerequisite existence in section's course
// @params  prerequisite - section to check existence
//          courseId - course id of section
const checkPrerequisitesConflict = async function (prerequisites, courseId, sectionId, transaction) {
    const postSections = await db.SectionPrerequisites.findAll({
        where: {
            preSectionId: sectionId
        },
        transaction
    });

    const postSectionsIds = postSections.map(section => section.postSectionId);

    for (const sectionId of prerequisites) {
        if (postSectionsIds.includes(sectionId)) {
            throw new APIError({
                message: `The section with id "${sectionId}" is postSection(dependent) of this section. It cannot be prerequisite to this section`,
                status: httpStatus.CONFLICT
            })
        }
    }
};


const setSectionPrerequisites = async (sectionId, prerequisites, transaction) => {

    return new Promise(async (resolve, reject) => {

        try {

            let existingPrerequisites = await db.SectionPrerequisites.findAll({
                where: {
                    postSectionId: sectionId
                },
                transaction
            });

            let existingPrerequisitesArr = existingPrerequisites.map((prerequisite) => {
                console.log(prerequisite);
                return prerequisite.preSectionId;
            });

            let prerequisitesToSuspend = existingPrerequisitesArr.filter(item => {
                console.log({item});
                console.log(!prerequisites.includes(item));
                return !prerequisites.includes(item);
            });

            let suspendedPrerequisites = await db.SectionPrerequisites.destroy({
                where: {
                    preSectionId: {
                        [Op.in]: prerequisitesToSuspend
                    }
                },
                transaction
            });

            let prerequisitesToCreate = prerequisites.filter(prerequisite => !existingPrerequisitesArr.includes(prerequisite));

            let prerequisiteArray = prerequisitesToCreate.map(prerequisite => {
                return {
                    preSectionId: prerequisite,
                    postSectionId: sectionId
                }
            });

            let newPrerequisites = await db.SectionPrerequisites.bulkCreate(prerequisiteArray, {
                transaction,
                validate: true
            });

            return resolve({
                suspendedPrerequisites,
                newPrerequisites
            });

        } catch (err) {
            return reject(err);
        }

    });

};


//
// // @desc    inserts several prerequisites for section using loop
// // @params  prerequisites - array of prerequisites
// //          sectionId -
// const insertSectionPrerequisites = async (prerequisites, sectionId, transaction) => {
//     try {
//
//         for (let i = 0; i < prerequisites.length; i++) {
//             await db.SectionPrerequisites.create({
//                 preSectionId: prerequisites[i],
//                 postSectionId: sectionId
//             }, {transaction});
//         }
//
//         await db.SectionPrerequisites.findAll({
//             where: {
//                 postSectionId: sectionId
//             },
//             transaction
//         }).then(preSections => {
//             return preSections
//         }).catch(err => {
//             throw err;
//         })
//
//     } catch (e) {
//         let err = new Error('Error while creating section prerequisites: ' + e.message);
//         err.statusCode = e.statusCode;
//         throw err;
//     }
//
// };
