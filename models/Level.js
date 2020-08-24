'use strict';
module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('Level', {
        // id: {
        //     allowNull: false,
        //     primaryKey: true,
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        }
    }, {});
    Level.associate = function (models) {
        // associations can be defined here
        models.Level.belongsTo(models.Section, {
            foreignKey: 'sectionId',
            onDelete: 'CASCADE'
        });
        models.Level.hasMany(models.Lesson, {
            foreignKey: 'levelId',
            onDelete: 'CASCADE'
        });
    };
    return Level;
};