import { XmlItem } from '@/models/types/job.types';
import xml2js from 'xml2js';

export const parseXML = async (data: string): Promise<XmlItem[]> => {
  const json = await xml2js.parseStringPromise(data, {
    explicitArray: true,
    trim: true,
  });

  const channel = json?.rss?.channel?.[0];
  if (!channel) {
    throw new Error('Invalid XML structure: channel not found');
  }

  return channel.item ?? [];
};
