import { type NextFunction, type Request } from "express";

import { type THttpError } from "@/types/http";
import errorObject from "@/utils/error.object";

export default (
  nextFunc: NextFunction,
  err: Error | unknown,
  req: Request,
  errorStatusCode = 500,
): void => {
  const errorObj = errorObject(err, req, (err as THttpError).statusCode || errorStatusCode);
  return nextFunc(errorObj);
};
