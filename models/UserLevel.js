  'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLevel = sequelize.define('UserLevel', {
    // id: {
    //   allowNull: false,
    //   primaryKey: true,
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4
    // },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
  }, {});

  UserLevel.associate = function(models) {
    // associations can be defined here
    UserLevel.belongsTo(models.Section, {
      foreignKey: 'sectionId',
      onDelete: 'CASCADE'
    });
    models.UserLevel.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  UserLevel.level = function(sectionId, userId) {
    UserLevel.findOne({
      where: {
        userId: userId,
        sectionId: sectionId
      },
      attributes: ['level']
    })
        .then(level => {
          return level
        })
  };

  return UserLevel;
};

