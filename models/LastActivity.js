'use strict';
module.exports = (sequelize, DataTypes) => {
  const LastActivity = sequelize.define('LastActivity', {
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('lesson', 'task', 'registration', 'newLevel'),
      allowNull: false
    }
  }, {});
  LastActivity.associate = function(models) {
    // associations can be defined here
    LastActivity.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return LastActivity;
};