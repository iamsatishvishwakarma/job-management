import { Controller } from "@/types/controller";
import httpResponse from "@/utils/httpResponse";
import httpError from "@/utils/httpError";
import { ParsedQs } from "qs";
import { getAllImportLogService } from "../services/job.log.service";

export const getAllImportLog: Controller<{}, {}, {}, ParsedQs> = async (req, res, next) => {
  try {
    const { search, page, limit } = req.query;
    const response = await getAllImportLogService({
      search: search as string,
      page: Number(page),
      limit: Number(limit)
    });
    return httpResponse(req, res, 200, "Jobs fetched successfully", response)
  } catch (error) {
    return httpError(next, error, req)
  }
};