const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432, // default Postgres port
  database: "basic_recruiter_tool",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
