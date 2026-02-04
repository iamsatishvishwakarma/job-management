import { type NextFunction, type Request, type Response } from "express";

import config from "@/configs/app.config";
import { rateLimiterMongo } from "@/configs/rate.limiter.config";
import { EApplicationEnvironment } from "@/constants/application.constant";
import responseMessage from "@/constants/response.message.constant";
import httpError from "@/utils/http.error";

export default (req: Request, _: Response, next: NextFunction) => {
  if (config.NODE_ENV === EApplicationEnvironment.DEVELOPMENT) {
    return next();
  }

  if (rateLimiterMongo) {
    rateLimiterMongo
      .consume(req.ip as string, 1)
      .then(() => {
        return next();
      })
      .catch(() => {
        return httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429);
      });
  }
};
