import { EApplicationEnvironment } from "@/constants/application.constant";

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    NODE_ENV: EApplicationEnvironment;
    SERVER_URL: string;
  }
}
