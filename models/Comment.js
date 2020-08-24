'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    like: DataTypes.INTEGER,
    dislike: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }

  }, {});
  Comment.associate = function(models) {

    models.Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    models.Comment.hasMany(models.CommentType, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });
    models.Comment.hasMany(models.Reply, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });

    models.Comment.hasMany(models.Likes, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });

  };
  return Comment;

};