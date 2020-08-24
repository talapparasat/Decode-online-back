const sequelize = require('sequelize');
const multer = require('multer');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const db = require('../../models');
const orderNormalizer = require('../../helpers/orderNormalizer');

exports.getAllLessons = async function (req, res) {
    try {
        const {levelId} = req.query;

        const lessons = await db.Lesson.findAll({
            where: {
                ...levelId ? {levelId} : {}
            },
            include: [{
                model: db.Level,
                attributes: ['id', 'title', 'order'],
                include: [{
                    model: db.Section,
                    attributes: ['id', 'name', 'order'],
                    include: [{
                        model: db.Course,
                        attributes: ['id', 'name', 'order']
                    }]
                }]
            }],
            attributes: ['id', 'title', 'number_of_likes', 'number_of_dislikes', 'order', 'levelId'],
            order: [
                [{model: db.Level}, {model: db.Section}, {model: db.Course}, 'order', 'ASC'],
                [{model: db.Level}, {model: db.Section}, 'order', 'ASC'],
                [{model: db.Level}, 'order', 'ASC'],
                ['order', 'ASC'],
            ]
        });

        res.send(lessons);

    } catch (err) {
        next(err)
    }
};

exports.getLessonById = async function (req, res, next) {

    try {
        let {lessonId} = req.params;

        let lesson = await db.Lesson.findByPk(lessonId);

        if (!lesson) {
            throw new APIError({
                message: 'There is no such lesson',
                status: httpStatus.NOT_FOUND
            })
        }

        res.send(lesson);
    } catch (err) {
        next(err)
    }

};

exports.addNewLesson = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        const {title, description, short_content, content, levelId} = req.body;
        let {order} = req.body;

        const level = await db.Level.findByPk(levelId);

        if (!level) {
            throw new APIError({
                message: 'There is no such level',
                status: httpStatus.NOT_FOUND,
            })
        }

        order = await orderNormalizer.normalizeOrdersOnCreate(db.Lesson, order, {levelId}, transaction);

        let lesson = await db.Lesson.create({
            title,
            description,
            short_content,
            content,
            levelId,
            order
        }, {transaction});

        await transaction.commit();
        res.json(lesson);

    } catch (err) {
        await transaction.rollback();
        next(err);
    }
};

exports.updateLesson = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        const {title, description, short_content, content, levelId, order} = req.body;
        const {lessonId} = req.params;

        const lesson = await db.Lesson.findByPk(lessonId, {transaction});

        if (!lesson) {
            throw new APIError({
                message: 'There is no lesson with this id',
                status: httpStatus.UNPROCESSABLE_ENTITY,
            });
        }

        if (lesson.levelId !== levelId) {
            const level = await db.Level.findByPk(levelId, {transaction});

            if (!level) {
                throw new APIError({
                    message: 'There is no level with this id',
                    status: httpStatus.NOT_FOUND,
                });
            }
        }

        await orderNormalizer.normalizeOrdersOnUpdate(db.Lesson, lesson, order, {levelId}, transaction);

        lesson.title = title;
        lesson.description = description;
        lesson.short_content = short_content;
        lesson.content = content;
        lesson.levelId = levelId;

        await lesson.save({transaction});

        await transaction.commit();
        res.send(lesson);

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};

exports.deleteLesson = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        let {lessonId} = req.params;

        const lesson = await db.Lesson.findByPk(lessonId, {
            include: [{
                model: db.Task
            }],
            transaction
        });

        if (!lesson) {
            throw new APIError({
                message: 'There is no such lesson',
                status: httpStatus.UNPROCESSABLE_ENTITY
            })
        }

        if(lesson.Tasks.length !== 0) {
            throw new APIError({
                message: 'This lesson has tasks. Delete them first',
                status: httpStatus.CONFLICT
            })
        }

        await orderNormalizer.normalizeOrdersOnDelete(db.Lesson, lesson.order, {levelId: lesson.levelId}, transaction);

        await lesson.destroy({transaction});

        await transaction.commit();
        res.json({success: true});

    } catch (err) {
        await transaction.rollback();
        next(err);
    }
};



