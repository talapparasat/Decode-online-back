'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define('UserCourse', {
    chakra: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {});
  UserCourse.associate = function(models) {
    // associations can be defined here
    UserCourse.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
    UserCourse.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserCourse;
};