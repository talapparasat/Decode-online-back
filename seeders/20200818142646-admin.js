'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      try {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync('123456789', salt);

        queryInterface.bulkInsert('Users', [{
          name: 'Admin',
          email: 'admin@decode.kz',
          password: password,
          role: 'admin',
          date: new Date()
        }], {});

        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', {email: 'admin@decode.kz'}, {});
  }
};
