import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Mod from '@/models/Mod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    const mods = await Mod.find({});
    res.status(200).json(mods);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
