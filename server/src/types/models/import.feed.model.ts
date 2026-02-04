
export interface ImportFeedType {
  batchId: string;
  url: string;
  chunkNo: string;
  externalId: string;
  title: string;
  link: string;
  pubDate: Date;
  description: string;
  content: string;
  company: string;
  location: string;
  jobType: string;
  media: {
    url: string;
    type: string;
  };
}

/**
 * RSS Response
 */
export interface XmlRssResponse {
  rss?: {
    channel: XmlChannel[];
  };
  feed?: {
    entry: XmlItem[];
  };
}

/**
 * RSS Channel
 */
export interface XmlChannel {
  title?: string[];
  link?: string[];
  description?: string[];
  item?: XmlItem[];
}

/**
 * Job / Feed Item
 */
export interface XmlItem {
  title?: string[];
  id?: string[];
  link?: string[];
  pubDate?: string[];

  guid?: XmlGuid[];

  description?: string[];
  ['content:encoded']?: string[];

  ['media:content']?: XmlMediaContent[];

  ['job_listing:location']?: string[];
  ['job_listing:job_type']?: string[];
  ['job_listing:company']?: string[];

  // Fallbacks for other RSS feeds
  company?: string[];
  location?: string[];
  type?: string[];
}

/**
 * GUID structure
 */
export interface XmlGuid {
  _: string;
  $?: {
    isPermaLink?: string;
  };
}

/**
 * Media (image / video)
 */
export interface XmlMediaContent {
  $: {
    url: string;
    medium?: string;
  };
}
