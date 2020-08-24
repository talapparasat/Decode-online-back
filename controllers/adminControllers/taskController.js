const sequelize = require('sequelize');
const db = require('../../models');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const orderNormalizer = require('../../helpers/orderNormalizer');

exports.getAllTasks = async function (req, res, next) {
    try {
        const {lessonId} = req.query;

        const tasks = await db.Task.findAll({
            where: {
                ...lessonId ? {lessonId} : {}
            },
            include: [{
                model: db.Lesson,
                attributes: ['id', 'title', 'order'],
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
            }],
            order: [
                [{model: db.Lesson}, {model: db.Level}, {model: db.Section}, {model: db.Course}, 'order', 'ASC'],
                [{model: db.Lesson}, {model: db.Level}, {model: db.Section}, {model: db.Course}, 'order', 'ASC'],
                [{model: db.Lesson}, {model: db.Level}, {model: db.Section}, 'order', 'ASC'],
                [{model: db.Lesson}, {model: db.Level}, 'order', 'ASC'],
                [{model: db.Lesson}, 'order', 'ASC'],
                ['order', 'ASC'],
            ]
        });

        res.send(tasks);

    } catch (err) {
        next(err)
    }
};


exports.getTaskById = async function (req, res, next) {
    try {
        const {taskId} = req.params;

        const task = await db.Task.findByPk(taskId);

        if (!task) {
            throw new APIError({
                message: 'There is no task with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        res.send(task);
    } catch (err) {
        next(err)
    }
};


exports.addNewTask = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        const {title, description, requirements, content, solution, chakra, lessonId} = req.body;
        let {order} = req.body;

        const lesson = await db.Lesson.findByPk(lessonId, {transaction});

        if (!lesson) {
            throw new APIError({
                message: 'There is no lesson with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        order = await orderNormalizer.normalizeOrdersOnCreate(db.Task, order, {lessonId}, transaction);

        let task = await db.Task.create({
            title,
            description,
            solution,
            requirements,
            chakra,
            content,
            lessonId,
            order
        }, {transaction});

        await transaction.commit();
        res.send(task);

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};


exports.updateTask = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        const {title, description, requirements, content, solution, chakra, lessonId, order} = req.body;
        const {taskId} = req.params;

        const task = await db.Task.findByPk(taskId, {transaction});

        if(!task) {
            throw new APIError({
                message: 'There is no task with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        if(task.lessonId !== lessonId) {
            const lesson = await db.Lesson.findByPk(lessonId, {transaction});

            if(!lesson) {
                throw new APIError({
                    message: 'There is no lesson with this id',
                    status: httpStatus.NOT_FOUND
                })
            }
        }

        await orderNormalizer.normalizeOrdersOnUpdate(db.Task, task, order, {lessonId}, transaction);

        task.title = title;
        task.description = description;
        task.requirements = requirements;
        task.content = content;
        task.solution = solution;
        task.chakra = chakra;

        await task.save({transaction});

        await transaction.commit();
        res.send(task);

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};


exports.deleteTask = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        let {taskId} = req.params;

        const task = await db.Task.findByPk(taskId);

        if(!task) {
            throw new APIError({
                message: 'There is no task with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        await orderNormalizer.normalizeOrdersOnDelete(db.Task, task.order, {lessonId: task.lessonId}, transaction);

        await task.destroy({transaction});

        await transaction.commit();
        res.send({success: true});

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};




