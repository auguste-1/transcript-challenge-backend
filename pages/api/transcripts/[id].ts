import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { burgerKingFrance } from './_data/bk168068-93e8-4bb6-b762-dbc57d172111';
import { siteOne } from './_data/so164652-c0ef-4991-b7cc-474cc0ea911';
import { gogo } from './_data/gg1aa17c-0a31-495c-8e9d-6179de3d3111';

const cors = Cors({
  methods: ['GET'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send({ message: 'Only GET requests allowed' });

  const { id } = req.query;

  await runMiddleware(req, res, cors);

  let data = null;
  if (id === 'bk168068-93e8-4bb6-b762-dbc57d172111') data = burgerKingFrance;
  else if (id === 'so164652-c0ef-4991-b7cc-474cc0ea911') data = siteOne;
  else if (id === 'gg1aa17c-0a31-495c-8e9d-6179de3d3111') data = gogo;
  else return res.status(400).send({ message: `${id} is not a valid transript id` });

  return res.json(data);
}
