'use strict';
module.exports = (sequelize, DataTypes) => {
    const LastLesson = sequelize.define('LastLesson', {
        time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
    }, {});
    LastLesson.associate = function (models) {
        // associations can be defined here
        LastLesson.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            onDelete: 'CASCADE'
        });
        LastLesson.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return LastLesson;
};