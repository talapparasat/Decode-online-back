const sequelize = require('sequelize');
const db = require('../../models');
const isEmpty = require('../../validation/isEmpty');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');
const orderNormalizer = require('../../helpers/orderNormalizer');
const removeFile = require('../../helpers/removeFile');

exports.getAllCourses = async function (req, res, next) {
    try {
        const courses = await db.Course.findAll({
            order: [
                ['order', 'ASC']
            ]
        });

        res.send(courses);
    } catch (err) {
        next(err);
    }
};


exports.getAllCoursesWithSections = async function (req, res, next) {
    try {
        const courses = await db.Course.findAll({
            include: [{
                model: db.Section,
                attributes: ['name']
            }],
            order: [
                [{model: db.Section}, 'order', 'ASC'],
                ['order', 'ASC']
            ]
        });

        res.send(courses);
    } catch (err) {
        next(err);
    }
};


exports.getCourseById = async function (req, res, next) {
    try {
        const {courseId} = req.params;

        const course = await db.Course.findByPk(courseId);

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
};


exports.addNewCourse = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        const {name, description, img} = req.body;
        let {order} = req.body;

        order = await orderNormalizer.normalizeOrdersOnCreate(db.Course, order, {}, transaction);

        const course = await db.Course.create({
            name,
            description,
            img,
            order
        }, {transaction});

        await transaction.commit();
        res.send(course);

    } catch (err) {
        await transaction.rollback();
        await removeFile(req.body.img);
        next(err);
    }
};


exports.updateCourse = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {
        const {name, description, img, order} = req.body;
        const {courseId} = req.params;

        const course = await db.Course.findByPk(courseId, {transaction});

        if(!course) {
            throw new APIError({
                message: 'There is no course with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        await orderNormalizer.normalizeOrdersOnUpdate(db.Course, course, order, {}, transaction);

        course.name = name;
        course.description = description;

        let oldImg;

        if(img) {
            oldImg = course.img;
            course.img = img
        }

        await course.save({transaction});

        await transaction.commit();
        await removeFile(oldImg);
        res.send(course);

    } catch (err) {
        await transaction.rollback();
        await removeFile(req.body.img);
        next(err)
    }
};


exports.deleteCourse = async function (req, res, next) {

    const transaction = await db.sequelize.transaction();

    try {

        const {courseId} = req.params;

        const course = await db.Course.findByPk(courseId, {
            include: [{
                model: db.Section
            }],
            transaction
        });

        if(!course) {
            throw new APIError({
                message: 'There is no course with this id',
                status: httpStatus.NOT_FOUND
            })
        }

        if(course.Sections.length !== 0) {
            throw new APIError({
                message: 'This course have sections. Delete them first',
                status: httpStatus.CONFLICT
            })
        }

        await orderNormalizer.normalizeOrdersOnDelete(db.Course, course.order, {}, transaction);

        await course.destroy({transaction});

        await transaction.commit();
        await removeFile(course.img);
        res.json({success: true});

    } catch (err) {
        await transaction.rollback();
        next(err);
    }
};