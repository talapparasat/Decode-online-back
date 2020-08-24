'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    chakra: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Lesson, {
      foreignKey: 'lessonId',
      onDelete: 'CASCADE'
    });

    Task.hasMany(models.UserTask, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
    // Task.hasMany(models.CommentType, {
    //   foreignKey: 'taskId',
    //   onDelete: 'CASCADE'
    // });
    Task.hasMany(models.LastTask, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
    Task.hasMany(models.Help, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
  };
  return Task;
};