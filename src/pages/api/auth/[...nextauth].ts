import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { authOptions } from '~/server/utils/auth';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions(req));

export default handler;
