'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.UserLevel, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.UserCourse, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Comment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Reply, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.UserTask, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.belongsTo(models.Status, {
      foreignKey: 'statusId',
      onDelete: 'CASCADE',
      default: 1
    });
    models.User.hasMany(models.LastLesson, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.LastTask, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.LastActivity, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Likes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Help, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Feedback, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

  };

  return User;
};