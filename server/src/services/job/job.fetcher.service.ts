import { IJob, XmlItem, XmlRssResponse } from "@/features/v1/jobs/types/job.type";
import { mapXmlItemToJob } from "@/features/v1/jobs/utils/job.mapper";
import axios from "axios";
import xml2js from 'xml2js';

export const getAllJobsService = async () => {
  try {
    const response = await axios.get('https://jobicy.com/?feed=job_feed', { timeout: 60000 });
    if (response.statusText !== "OK") throw new Error("Failed to fetch jobs");
    const json = (await xml2js.parseStringPromise(response.data)) as XmlRssResponse;

    const channel = json.rss?.channel?.[0];
    if (!channel) throw new Error("Invalid XML structure");

    const jobs: XmlItem[] = channel.item ?? [];
    const totalJobs = jobs.length
    if (!totalJobs) return { inserted: 0, updated: 0, failed: 0, message: "No jobs found" };

    const operations: IJob[] = jobs.map((job) => {
      return mapXmlItemToJob(job);
    });

    return operations
  } catch (error) {
    throw error
  }
}