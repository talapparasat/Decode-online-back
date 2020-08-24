'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    type: DataTypes.STRING
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
    models.Likes.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
    models.Likes.belongsTo(models.Reply, {
      foreignKey: 'replyId',
      onDelete: 'CASCADE',
    });
    models.Likes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Likes;
};