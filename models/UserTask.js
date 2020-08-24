'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTask = sequelize.define('UserTask', {
    solution: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {});
  UserTask.associate = function(models) {
    // associations can be defined here
    UserTask.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
    UserTask.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserTask;
};