
import dotenv from "dotenv";
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export default {
  // General
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  // Database
  DATABASE_URL: process.env.DATABASE_URL,
}
export type TAppConfig = typeof import('./app.config').default;