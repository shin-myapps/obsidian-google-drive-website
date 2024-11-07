import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import ky from 'ky';
import { clientId } from '@/helpers/constants';

const cors = Cors({
  methods: ['POST'],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);
  if (req.method !== 'POST') return;

  const { expires_in, access_token } = await ky
    .post('https://oauth2.googleapis.com/token', {
      json: {
        client_id: clientId,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: req.body.refresh_token,
      },
    })
    .json<any>();

  res.json({ expires_in, access_token });
}