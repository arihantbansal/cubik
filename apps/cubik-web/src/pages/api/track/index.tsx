import type { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.json({
    ip:
      req.headers['x-real-ip'] ||
      req.headers['x-vercel-forwarded-for'] ||
      'localhost',
    country:
      req.headers['cf-ipcountry'] ||
      req.headers['x-vercel-ip-country'] ||
      'localhost',
    userAgent: req.headers['user-agent'],
    latitude: req.headers['x-vercel-ip-latitude'] || 'default',
    longitude: req.headers['x-vercel-ip-longitude'] || 'default',
  });
}
