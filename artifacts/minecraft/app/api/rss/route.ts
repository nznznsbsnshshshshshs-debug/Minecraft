import { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channelId } = req.query;

  if (typeof channelId !== 'string') {
    return res.status(400).json({ error: 'Invalid channelId' });
  }

  try {
    const feed = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    );
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
}
