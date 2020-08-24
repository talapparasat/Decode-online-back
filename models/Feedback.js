'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedback: DataTypes.TEXT
  }, {});
  Feedback.associate = function(models) {
    Feedback.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    };
  return Feedback;
};