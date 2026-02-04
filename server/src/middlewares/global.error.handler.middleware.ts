import { type Request, type Response } from "express";

import { type THttpError } from "@/types/http";

export default (err: THttpError, _: Request, res: Response) => {
  res.status(err.statusCode || 500).json(err);
};
