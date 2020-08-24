const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const LastActivity = require('../services/LastActivities');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');


exports.main = async (taskId, userId, solution, res)=> {

    db.UserTask.findOne({
        where: {
            userId: userId,
            taskId: taskId
        }
    }).then(userSolution => {
        if (userSolution !== null) {
            res({
                chakra: 'Данную задачу вы уже решили, мы верим вам :)'
            })
        } else {
            try {

                let value = LastActivity.saveLastTask(taskId, userId);
                LastActivity.saveLastActivity('task', userId, taskId);
            } catch (e) {
                console.log(e);
            }
            db.Task.findOne({
                where: {
                    id: taskId
                },
                attributes: ['solution', 'chakra', 'Lesson->Level->Section.courseId'],
                raw: true,
                include: [{
                    model: db.Lesson,
                    required: false,
                    attributes: [],
                    include: [{
                        model: db.Level,
                        required: false,
                        attributes: [],
                        include: [{
                            model: db.Section,
                            required: false,
                            attributes: [],
                        }]
                    }]
                }]
            }).then(task => {
                db.UserCourse.findOne({
                    where: {
                        userId: userId,
                        courseId: task.courseId
                    }
                }).then(result => {
                        if (result !== null) {
                            db.UserCourse.update(
                                {
                                    chakra: result.chakra + task.chakra
                                },
                                {
                                    where: {
                                        id: result.id
                                    }
                                }
                            ).then(userCourseRow => {
                                db.UserTask.create({
                                    userId: userId,
                                    taskId: taskId,
                                    solution: solution
                                }).then(success => {
                                    res({chakra: result.chakra + task.chakra})
                                }).catch(err => console.log(err))
                            })
                        }
                    }
                ).catch(err => console.log(err))
            }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
};

exports.getTaskById = async (req, res, next) => {
    try {

        const {taskId} = req.params;
        const userId = req.user.id;

        let task = await db.Task.findByPk(taskId, {
            include: [{
                model: db.UserTask,
                where: {
                    userId
                },
                required: false
            }]
        });

        task = task.toJSON();

        if(!task) {
            throw new APIError({
               message: 'There is no such task',
               status: httpStatus.NOT_FOUND
            })
        }

        const previousTask = await db.Task.findOne({
            where: {
                lessonId: task.lessonId,
                order: task.order - 1
            },
            attributes: ['id', 'title']
        });

        const nextTask = await db.Task.findOne({
            where: {
                lessonId: task.lessonId,
                order: task.order + 1
            },
            attributes: ['id', 'title']
        });

        task.isSolved = false;

        if(task.UserTasks.length !== 0) {
            task.isSolved = true
        }

        if(task.UserTasks.length) {
            task.userSolution = task.UserTasks[0].solution;
        }

        delete task.UserTasks;

        res.send({
            ...task,
            previousTask,
            nextTask
        })
        // if(task.UserTask)

    } catch (err) {
        next(err)
    }
};