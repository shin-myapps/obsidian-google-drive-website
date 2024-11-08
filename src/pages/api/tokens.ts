import type { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import { clientId } from '@/helpers/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return;

  const { access_token, refresh_token, expires_in } = await ky
    .post('https://oauth2.googleapis.com/token', {
      json: {
        client_id: clientId,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        code: req.body.code,
        grant_type: 'authorization_code',
        redirect_uri: req.headers.origin + '/loading',
      },
    })
    .json<any>();

  res.json({ access_token, refresh_token, expires_in });
}
