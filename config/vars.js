const path = require('path');

// import .env variables

require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

// const defaultESMapping = {
//   type: 'text',
// };

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  postgres: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  // esConfig: {
  //   indexName: 'employees',
  //   employeesMappings: {
  //     mappings: {
  //       properties: {
  //         firstName: defaultESMapping,
  //         lastName: defaultESMapping,
  //         designation: defaultESMapping,
  //         salary: defaultESMapping,
  //         dateOfJoining: defaultESMapping,
  //         address: defaultESMapping,
  //         gender: defaultESMapping,
  //         age: defaultESMapping,
  //         maritalStatus: defaultESMapping,
  //       },
  //     },
  //   },
  // },
};
