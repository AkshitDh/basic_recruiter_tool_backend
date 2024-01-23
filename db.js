const { Pool } = require("pg");

const pool = new Pool({
  user: "basic_recruiter_tool_db_user",
  password: process.env.DB_PASSWORD,
  host: "dpg-cmnm19da73kc73avcrtg-a",
  port: 5432, // default Postgres port
  database: "basic_recruiter_tool_db",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
