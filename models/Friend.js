'use strict';
module.exports = (sequelize, DataTypes) => {
    const Friends = sequelize.define('Friends', {
        first_user_id: DataTypes.INTEGER,
        second_user_id: DataTypes.INTEGER
    }, {});
    Friends.associate = function (models) {
        // associations can be defined here
        models.Friends.belongsTo(models.User, {
            foreignKey: 'secondUserId',
            onDelete: 'CASCADE'
        });
        models.Friends.belongsTo(models.User, {
            foreignKey: 'UserId',
            onDelete: 'CASCADE'
        });


    };
    return Friends;
}