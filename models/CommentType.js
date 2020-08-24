'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentType = sequelize.define('CommentType', {
    type: DataTypes.STRING,
    typeId: DataTypes.INTEGER
  }, {});
  CommentType.associate = function(models) {
    models.CommentType.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
    // models.CommentType.belongsTo(models.Lesson, {
    //   foreignKey: 'lessonId',
    //   onDelete: 'CASCADE'
    // });
    // models.CommentType.belongsTo(models.Task, {
    //   foreignKey: 'taskId',
    //   onDelete: 'CASCADE'
    // });
    // models.CommentType.belongsTo(models.Help, {
    //   foreignKey: 'helpId',
    //   onDelete: 'CASCADE'
    // });
  };
  return CommentType;
};