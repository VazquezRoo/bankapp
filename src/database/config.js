const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "password",
  database: "bankapp",
  logging: false,
});

module.exports = { db };
