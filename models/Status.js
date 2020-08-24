'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    status: DataTypes.STRING
  }, {});
  Status.associate = function(models) {

    models.Status.hasMany(models.User, {
      foreignKey: 'statusId',
      onDelete: 'CASCADE'
    });
  };
  return Status;
};