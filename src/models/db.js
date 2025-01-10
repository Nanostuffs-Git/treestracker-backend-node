const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    // const result = await pool.query("SELECT * from users"); // Test query to check connection
    console.log("Database connected successfully");
    // console.log("Query result:", result.rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
