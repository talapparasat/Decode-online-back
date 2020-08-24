'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      number_of_likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      number_of_dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      short_content: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.TEXT
      },

      levelId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Levels',
          key: 'id'
        }
      },

      preLessonId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Lessons',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lessons');
  }
};