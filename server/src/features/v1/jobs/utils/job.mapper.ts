import { IJob, XmlItem } from "@/features/v1/jobs/types/job.type";


export const mapXmlItemToJob = (item: XmlItem): IJob => {
  const getFirst = (val: any, fallback = "") => (Array.isArray(val) ? val[0] : val) ?? fallback;

  return {
    externalId: getFirst(item.guid)?._ ?? getFirst(item.link),
    title: getFirst(item.title),
    link: getFirst(item.link),
    pubDate: item.pubDate ? new Date(getFirst(item.pubDate)) : new Date(),
    company: getFirst(item["job_listing:company"]) || getFirst(item.company),
    location: getFirst(item["job_listing:location"]) || getFirst(item.location),
    jobType: getFirst(item["job_listing:job_type"]) || getFirst(item.type),
    media: item["media:content"]?.[0]?.$ ?? null,
    description: getFirst(item.description),
    content: getFirst(item["content:encoded"]),
  };
};