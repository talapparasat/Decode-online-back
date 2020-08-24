'use strict';
module.exports = (sequelize, DataTypes) => {
  const LastTask = sequelize.define('LastTask', {
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
  }, {});
  LastTask.associate = function(models) {
    // associations can be defined here
    LastTask.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
    LastTask.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return LastTask;
};