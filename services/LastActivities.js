const db = require('../models');

exports.saveLastLesson = async function (lessonId, userId) {
    try {

        let output = await db.LastLesson.findOne({
            where: {
                lessonId: lessonId,
                userId: userId
            }
        })
            .then(isExist => {
                if (isExist) {
                    db.LastLesson.update(
                        {
                            time: Date.now()
                        },
                        {
                            where: {
                                lessonId: lessonId,
                                userId: userId
                            }
                        })
                        .then(updatedRecord => {
                            db.LastLesson.findOne({
                                where: {
                                    lessonId: lessonId,
                                    userId: userId
                                }
                            }).then(updatedResult => {
                                return {
                                    updatedRecord: updatedResult
                                }
                            })

                        })
                } else {
                    db.LastLesson.count({
                        where: {
                            userId: userId
                        }
                    })
                        .then(rowCount => {
                            if (rowCount >= 4) {
                                db.LastLesson.findOne({
                                    attributes: ['id'],
                                    order: [
                                        ['time', 'ASC']
                                    ],
                                    limit: 1,
                                    where: {
                                        userId: userId
                                    }
                                })
                                    .then(forDelete => {
                                        db.LastLesson.destroy({
                                            where: {
                                                id: forDelete.id
                                            }
                                        })
                                            .then(isDeleted => {
                                                if (isDeleted) {
                                                    db.LastLesson.create({
                                                        lessonId: lessonId,
                                                        userId: userId
                                                    }).then((createdRecord) => {
                                                        return {
                                                            forDelete: forDelete,
                                                            createdRecord: createdRecord,
                                                            isDeleted: isDeleted
                                                        }
                                                    })
                                                } else {
                                                    return {
                                                        forDelete: forDelete,
                                                        isDeleted: isDeleted
                                                    }
                                                }
                                            });

                                    });
                            } else {
                                db.LastLesson.create({
                                    lessonId: lessonId,
                                    userId: userId
                                }).then(createdRecord => {
                                    return {
                                        createdRecord: createdRecord
                                    }
                                })
                            }
                        })
                }
            });

        return output;
    } catch (e) {
        // Log Errors
        throw Error('Error in saving last activity')
    }

};

exports.saveLastTask = async function (taskId, userId) {
    try {
        let output = await db.LastTask.findOne({
            where: {
                taskId: taskId,
                userId: userId
            }
        })
            .then(isExist => {
                if (isExist) {
                    db.LastTask.update(
                        {
                            time: Date.now()
                        },
                        {
                            where: {
                                taskId: taskId,
                                userId: userId
                            }
                        })
                        .then(updatedRecord => {
                            db.LastTask.findOne({
                                where: {
                                    taskId: taskId,
                                    userId: userId
                                }
                            }).then(updatedResult => {
                                return {
                                    updatedRecord: updatedResult
                                }
                            })

                        }).catch(err => console.log(err))
                } else {
                    db.LastTask.count({
                        where: {
                            userId: userId
                        }
                    })
                        .then(rowCount => {
                            if (rowCount >= 4) {
                                db.LastTask.findOne({
                                    attributes: ['id'],
                                    order: [
                                        ['time', 'ASC']
                                    ],
                                    limit: 1,
                                    where: {
                                        userId: userId
                                    }
                                })
                                    .then(forDelete => {
                                        db.LastTask.destroy({
                                            where: {
                                                id: forDelete.id
                                            }
                                        })
                                            .then(isDeleted => {
                                                if (isDeleted) {
                                                    db.LastTask.create({
                                                        taskId: taskId,
                                                        userId: userId
                                                    }).then((createdRecord) => {
                                                        return {
                                                            forDelete: forDelete,
                                                            createdRecord: createdRecord,
                                                            isDeleted: isDeleted
                                                        }
                                                    }).catch(err => console.log(err))
                                                } else {
                                                    return {
                                                        forDelete: forDelete,
                                                        isDeleted: isDeleted
                                                    }
                                                }
                                            }).catch(err => console.log(err));

                                    }).catch(err => console.log(err));
                            } else {
                                db.LastTask.create({
                                    taskId: taskId,
                                    userId: userId
                                }).then(createdRecord => {
                                    return {
                                        createdRecord: createdRecord
                                    }
                                }).catch(err => console.log(err))
                            }
                        }).catch(err => console.log(err))
                }
            }).catch(err => console.log(err));

        return output;
    } catch (e) {
        // Log Errors
        throw Error('Error in saving last task')
    }
};

exports.saveLastActivity = async function (type, userId, id = null) {

    switch (type) {
        case 'lesson':
            db.Lesson.findByPk(id, {
                attributes: ['title']
            }).then(lesson => {
                    db.LastActivity.findOne({
                        where: {
                            info: lesson.title,
                            userId: userId
                        }
                    }).then(isExist =>{
                            if (isExist){
                                console.log("exist")
                            }
                            else{ db.LastActivity.create({
                                type: 'lesson',
                                userId: userId,
                                info: lesson.title})
                            }

                    }).catch(err => console.log(err))

                }).catch(err => console.log(err));
            break;

        case 'task':
            db.Task.findByPk(id, {
                attributes: ['title']
            })
                .then(task => {
                    db.LastActivity.create({
                        type: 'task',
                        userId: userId,
                        info: task.title
                    })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
            break;

        case 'registration':
            db.LastActivity.create({
                type: 'registration',
                userId: userId
            }).catch(err => console.log(err));
            break;
        case 'level':
                    db.LastActivity.create({
                        type: 'lesson',
                        userId: userId
                    })
                        .catch(err => console.log(err));
            break;

    }
};

