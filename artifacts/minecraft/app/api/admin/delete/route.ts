import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle file deletion here
  res.status(200).json({ message: 'Deletion successful' });
}
