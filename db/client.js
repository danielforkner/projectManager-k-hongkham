// Connect to DB
// const { Client } = require("pg");
import pg from "pg";
const Client = pg.Client;
// change the DB_NAME string to whatever your group decides on
const DB_NAME = "projectManager";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}

export default client;
