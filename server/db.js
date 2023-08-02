const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "moi",
  database: "sera",
});

module.exports = pool;
