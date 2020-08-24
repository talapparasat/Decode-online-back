'use strict';
const DEFAULT_IMAGES = require('../config/upload').defaults;
module.exports = (sequelize, DataTypes) => {
    const Section = sequelize.define('Section', {
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
        prerequisite: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        level_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defaultImage: {
            type: DataTypes.VIRTUAL,
            get() {
                return DEFAULT_IMAGES.section
            }
        }
    }, {});
    Section.associate = function (models) {
        // associations can be defined here
        models.Section.belongsTo(models.Course, {
            foreignKey: 'courseId',
            onDelete: 'CASCADE',
        });
        models.Section.hasMany(models.UserLevel, {
            foreignKey: 'sectionId',
            onDelete: 'CASCADE'
        });
        models.Section.hasMany(models.Level, {
            foreignKey: 'sectionId',
            onDelete: 'CASCADE'
        });

        models.Section.hasMany(models.SectionPrerequisites, {
            as: 'PostSectionsRecords',
            foreignKey: 'preSectionId',
            onDelete: 'CASCADE'
        });
        models.Section.hasMany(models.SectionPrerequisites, {
            as: 'PreSectionsRecords',
            foreignKey: 'postSectionId',
            onDelete: 'CASCADE'
        });

        models.Section.belongsToMany(models.Section, {
            as: 'PreSections',
            through: models.SectionPrerequisites,
            foreignKey: 'postSectionId',
        });

        models.Section.belongsToMany(models.Section, {
            as: 'PostSections',
            through: models.SectionPrerequisites,
            foreignKey: 'preSectionId',
        })
    };
    return Section;
};
