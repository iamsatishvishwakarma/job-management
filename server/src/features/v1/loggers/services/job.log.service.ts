import { IImportLog } from "@/features/v1/loggers/types/job.logger.type";
import { ImportLog } from "@/features/v1/loggers/models/job.logger.model";

export const insertJobsLogService = async (data: IImportLog) => {
  try {
    return await ImportLog.create(data);
  } catch (error) {
    throw error
  }
};



export const getAllImportLogService = async ({
  search,
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const query: any = {};

    if (search) {
      query.$or = [
        { fileName: new RegExp(search, "i") },
      ];
    }

    
    const skip = ((page || 1) - 1) * limit;

    const [data, total] = await Promise.all([
      ImportLog.find(query).skip(skip).limit(limit).lean(),
      ImportLog.countDocuments(query),
    ]);

    return {
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  } catch (error) {
    throw error
  }
};