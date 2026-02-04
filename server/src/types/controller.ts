import type { AppRequest, AppResponse, AppNext } from "@/types/express";

// Changing defaults from unknown to Record<string, never>
export type Controller<
  Params = Record<string, never>,
  ResBody = unknown,
  ReqBody = Record<string, never>,
  Query = Record<string, never>,
> = (
  req: AppRequest<Params, ResBody, ReqBody, Query>,
  res: AppResponse<ResBody>,
  next: AppNext,
) => void | Promise<void | unknown>; // Added 'any' to return type to allow 'return res...'
