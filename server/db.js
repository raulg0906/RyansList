const config = require("config");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: config.get("db.hostname"),
  user: config.get("db.username"),
  password: config.get("db.password"),
  database: config.get("db.database")
});

module.exports = pool;
