'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      like: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      dislike: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};