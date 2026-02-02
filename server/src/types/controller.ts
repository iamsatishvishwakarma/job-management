import type { AppRequest, AppResponse, AppNext } from "@/types/express";

export type Controller<
  Params = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  Query = unknown
> = (
  req: AppRequest<Params, ResBody, ReqBody, Query>,
  res: AppResponse<ResBody>,
  next: AppNext
) => void | Promise<void>;
