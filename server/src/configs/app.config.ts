import dotenv from "dotenv";
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

export default {
  // General
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // REDIS
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};
export type TAppConfig = typeof import("./app.config").default;
