'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('SectionPrerequisites', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            preSectionId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull: true,
                references: {
                    model: 'Sections',
                    key: 'id'
                }
            },

            postSectionId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'Sections',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('SectionPrerequisites');
    }
};