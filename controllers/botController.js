const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');


exports.getSectionByCourseId = async function (req, res) {
    try {
        let id = 1
        let sections = await db.Section.findAll({
            where: {
                courseId: id
            },
            order: [['id', 'ASC']]
        });
        res.json(sections);
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

exports.getLessonsBySectionId = async function (req, res) {
    try {
        let id = req.query['sectionId'];
        let lessons = await db.Level.findAll({
            where: {
                sectionId: id
            },
        });
        res.json(lessons);
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};


exports.getLessonsBySectionId2 = async function (req, res) {
    try {
        let id = req.query['sectionId'];
        let lessons;
        let levels = await db.Level.findAll({
            where: {
                sectionId: id
            },  include:[{
                model: db.Lesson,
                required: true,
                raw:true,
            }],
        });
        // for (let i = 0; i < levels.length; i++)
        // {
        //     let level = levels[i];
        //     lessons = await db.Lesson.findAll({
        //         where: {levelId: level.id},
        //     });
        // }
        res.json(levels);
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

exports.getRandomTasksByLessonId = async function (req, res) {
    try {
        let id = req.query['lessonId'];
        let tasks = await db.Task.findAll({
            where: {
                lessonId: id
            }
        });
        let taskIdArr = []
        tasks.map(task => {
            taskIdArr.push(task.id)
        })
        let taskIdIndex = Math.floor(Math.random() * taskIdArr.length)
        let taskId = taskIdArr[taskIdIndex]
        let task = await db.Task.findByPk(taskId);
        res.json(task); 
    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};
