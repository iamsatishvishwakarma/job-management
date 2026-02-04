import bodyParser from "body-parser";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";

import cors from "@/configs/cors.config";
import responseMessage from "@/constants/response.message.constant";
import globalErrorHandlerMiddleware from "@/middlewares/global.error.handler.middleware";
import router from "@/routes";
import httpError from "@/utils/http.error";

const app = express();

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api", router);

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND("route"));
  } catch (err) {
    httpError(next, err, req, 404);
  }
});

// Global Error Handler
app.use(globalErrorHandlerMiddleware);

export default app;
