'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Statuses', [
            {
                status: 'Новичок',
            },
            {
                status: 'Продвинутый',
            },
            {
                status: 'Выпускник',
            },
            {
                status: 'Ищу работу',
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Statuses', null, {});
    }
};
