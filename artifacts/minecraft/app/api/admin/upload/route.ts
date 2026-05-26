import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle file upload here
  res.status(200).json({ message: 'Upload successful' });
}
