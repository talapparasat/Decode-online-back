const {postgres} = require('../config/vars');

module.exports = {
  development:{
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    host: postgres.host,
    port: postgres.port,
    dialect: "postgres",
    pg: "^8.3.0",
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    host: postgres.host,
    port: postgres.port,
    dialect: "postgres",
    pg: "^8.3.0",
    define: {
      timestamp: false
    }
  }
};
