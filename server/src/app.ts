import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from '@/routes';
import * as dotenv from 'dotenv'
export const app: Express = express();
import { RedisSingleton } from './redis';
//import { User } from './controllers/user';
dotenv.config({ path: `.env${process.env.NODE_ENV}` });

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes)

app.get('/health', async (_req: Request, res: Response) => {
  return res.send({ status: 'ok' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000')
});

//if (process.env.ENV != 'development') RedisSingleton.getInstance().connect()
