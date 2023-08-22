require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    logging: false,
  },
  //   test: {
  //     username: "root",
  //     password: null,
  //     database: "database_test",
  //     host: "127.0.0.1",
  //     dialect: "mysql",
  //   },
  //   production: {
  //     username: "root",
  //     password: null,
  //     database: "database_production",
  //     host: "127.0.0.1",
  //     dialect: "mysql",
  //   },
};
