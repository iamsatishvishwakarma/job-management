import type { Request, Response, NextFunction } from "express";

export type AppRequest<
  Params = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  Query = unknown,
> = Request<Params, ResBody, ReqBody, Query>;

export type AppResponse<ResBody = unknown> = Response<ResBody>;

export type AppNext = NextFunction;
