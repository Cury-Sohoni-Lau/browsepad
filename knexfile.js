require("dotenv").config();

module.exports = {
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.DB_USER}@127.0.0.1:5432/${process.env.DB_NAME}`,
  searchPath: "public",
};
