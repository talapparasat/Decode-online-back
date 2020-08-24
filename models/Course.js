'use strict';
const DEFAULT_IMAGES = require('../config/upload').defaults;
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    // id: {
    //   allowNull: false,
    //   primaryKey: true,
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    defaultImage: {
      type: DataTypes.VIRTUAL,
      get() {
        return DEFAULT_IMAGES.course
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
    models.Course.hasMany(models.Section, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
    models.Course.hasMany(models.UserCourse, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
  };


  return Course;
};