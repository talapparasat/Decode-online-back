const sequelize = require('sequelize');
const db = require('../../models');
const Op = sequelize.Op;
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const orderNormalizer = require('../../helpers/orderNormalizer');


exports.getAllLevels = async function (req, res, next) {
    try {

        const {courseId, sectionId} = req.query;

        const levels = await db.Level.findAll({
            where: {
                ...sectionId ? {sectionId} : {}
            },
            include: [{
                model: db.Section,
                where: {
                    ...courseId ? {courseId} : {}
                },
                attributes: ['id', 'name', 'order'],
                include: [{
                    model: db.Course,
                    attributes: ['id', 'name', 'order']
                }]
            }],
            order: [
                [{model: db.Section}, {model: db.Course}, 'order', 'ASC'],
                [{model: db.Section}, 'order', 'ASC'],
                ['order', 'ASC'],
            ]
        });

        res.send(levels);

    } catch (err) {
        next(err)
    }
};


exports.getLevelById = async function (req, res, next) {
    try {
        const {levelId} = req.params;

        const level = await db.Level.findByPk(levelId);

        if (!level) {
            throw new APIError({
                message: 'There is no level with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        res.send(level);

    } catch (err) {
        next(err)
    }
};


exports.addNewLevel = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {

        const {title, price, sectionId} = req.body;
        let {order} = req.body;

        const section = await db.Section.findByPk(sectionId, {transaction});

        if (!section) {
            throw new APIError({
                message: 'Section specified not found',
                status: httpStatus.UNPROCESSABLE_ENTITY,
            });
        }

        order = await orderNormalizer.normalizeOrdersOnCreate(db.Level, order, {sectionId}, transaction);

        const level = await db.Level.create({
            title,
            order,
            price,
            sectionId
        }, {transaction});

        section.level_count = section.level_count + 1;
        await section.save({transaction});

        await transaction.commit();
        res.send(level);

    } catch (err) {
        await transaction.rollback();
        next(err)
    }

};


exports.updateLevel = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {

        const {title, order, price, sectionId} = req.body;
        const {levelId} = req.params;

        const level = await db.Level.findByPk(levelId, {transaction});

        if (!level) {
            throw new APIError({
                message: 'There is no level with this id',
                status: httpStatus.UNPROCESSABLE_ENTITY,
            });
        }

        if (level.sectionId !== sectionId) {
            const section = await db.Section.findByPk(sectionId, {transaction});

            if (!section) {
                throw new APIError({
                    message: 'There is no section with this id',
                    status: httpStatus.NOT_FOUND,
                });
            }

            section.level_count = section.level_count + 1;
            await section.save({transaction});

            //Decrement of level_count attribute of old section
            await db.Section.decrement('level_count', {
                where: {
                    id: level.sectionId,
                },
                transaction
            });
        }

        await orderNormalizer.normalizeOrdersOnUpdate(db.Level, level, order, {sectionId: sectionId}, transaction);

        level.title = title;
        level.price = price;
        level.sectionId = sectionId;

        await level.save({transaction});

        await transaction.commit();
        res.json(level);

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};


exports.deleteLevel = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {

        const {levelId} = req.params;

        const level = await db.Level.findByPk(levelId, {
            include: [
                {
                    model: db.Lesson
                },
                {
                    model: db.Section
                }
            ],
            transaction
        });

        if (!level) {
            throw new APIError({
                message: 'There is no such level',
                status: httpStatus.UNPROCESSABLE_ENTITY
            })
        }

        if (level.Lessons.length !== 0) {
            throw new APIError({
                message: 'This level has lessons. Delete them first',
                status: httpStatus.CONFLICT
            })
        }

        await orderNormalizer.normalizeOrdersOnDelete(db.Level, level.order, {sectionId: level.sectionId}, transaction);

        level.Section.level_count = level.Section.level_count - 1;
        await level.Section.save({transaction});

        await level.destroy({transaction});

        await transaction.commit();
        res.json({success: true});

    } catch (err) {
        await transaction.rollback();
        next(err)
    }

};