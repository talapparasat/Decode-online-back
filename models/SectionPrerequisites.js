'use strict';
module.exports = (sequelize, DataTypes) => {
    const SectionPrerequisites = sequelize.define('SectionPrerequisites', {

    }, {});
    SectionPrerequisites.associate = function(models) {
        // associations can be defined here
        models.SectionPrerequisites.belongsTo(models.Section, {
            as: 'PostSectionsRecords',
            foreignKey: 'preSectionId',
            onDelete: 'CASCADE',
        });
        models.SectionPrerequisites.belongsTo(models.Section, {
            as: 'PreSectionsRecords',
            foreignKey: 'postSectionId',
            onDelete: 'CASCADE'
        });
    };
    return SectionPrerequisites;
};
