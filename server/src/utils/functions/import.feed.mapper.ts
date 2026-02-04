import { type XmlItem } from '@/models/types/job.types';

export const importFeedMapper = (item: XmlItem, name: string) => {
  const getFirst = (val: unknown, fallback = '') =>
    (Array.isArray(val) ? val[0] : val) ?? fallback;

  switch (name) {
    case 'jobicy':
      return {
        externalId: getFirst(item.guid)?._ ?? getFirst(item.link),
        title: getFirst(item.title),
        link: getFirst(item.link),
        pubDate: item.pubDate ? new Date(getFirst(item.pubDate)) : new Date(),
        company:
          getFirst(item['job_listing:company']) || getFirst(item.company),
        location:
          getFirst(item['job_listing:location']) || getFirst(item.location),
        jobType: getFirst(item['job_listing:job_type']) || getFirst(item.type),
        media: item['media:content']?.[0]?.$ ?? null,
        description: getFirst(item.description),
        content: getFirst(item['content:encoded']),
      };
    default:
      return {
        externalId: getFirst(item.guid),
        title: getFirst(item.title),
        link: getFirst(item.link),
        pubDate: new Date(getFirst(item.pubDate)),
        description: getFirst(item.description),
        content: getFirst(item['content:encoded']),
        company: getFirst(item.company),
        location: getFirst(item.location),
        jobType: getFirst(item.type),
        media: getFirst(item['media:content']),
      };
  }
};
