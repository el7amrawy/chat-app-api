import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_URL, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

let { ENV } = process.env;
ENV = ENV?.replace(/\s/g, "");

const dev: pg.ConnectionConfig = {
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

const client: pg.Pool = new pg.Pool(
  ENV === "prod" ? { connectionString: DB_URL } : dev
);

export default client;
