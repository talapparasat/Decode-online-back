'use strict';
module.exports = (sequelize, DataTypes) => {
  const Help = sequelize.define('Help', {
    TaskName:{
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },

  }, {});
  Help.associate = function(models) {
    // associations can be defined here
    Help.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Help.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
    // models.Lesson.hasMany(models.CommentType, {
    //   foreignKey: 'helpId',
    //   onDelete: 'CASCADE'
    // });
  };
  return Help;
};