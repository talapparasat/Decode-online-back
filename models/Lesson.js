'use strict';
module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define('Lesson', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        number_of_likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        },
        number_of_dislikes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        }
    }, {});
    Lesson.associate = function (models) {
        // associations can be defined here
        models.Lesson.belongsTo(models.Level, {
            foreignKey: 'levelId',
            onDelete: 'CASCADE'
        });

        // models.Lesson.hasMany(models.CommentType, {
        //     foreignKey: 'lessonId',
        //     onDelete: 'CASCADE'
        // });

        models.Lesson.hasMany(models.Task, {
            foreignKey: 'lessonId',
            onDelete: 'CASCADE'
        });

        models.Lesson.hasOne(models.Lesson, {
            as: "preLesson",
            foreignKey: "preLessonId",
            onDelete: 'SET NULL'
        })
    };
    return Lesson;
};
