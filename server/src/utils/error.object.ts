import { Request } from "express";

import config from "@/configs/app.config";
import { EApplicationEnvironment } from "@/constants/application.constant";
import responseMessage from "@/constants/response.message.constant";
import { THttpError } from "@/types/http";
import logger from "@/utils/logger";

export default (err: Error | unknown, req: Request, errorStatusCode = 500): THttpError => {
  const errorObj: THttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      err instanceof Error
        ? err.message || responseMessage.SOMETHING_WENT_WRONG
        : responseMessage.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null,
  };

  // Log
  logger.error(`CONTROLLER_ERROR`, {
    meta: errorObj,
  });

  // Production Env check
  if (config.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
    delete errorObj.trace;
  }

  return errorObj;
};
