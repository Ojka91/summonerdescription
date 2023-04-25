import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { routes } from '@/routes';
import * as dotenv from 'dotenv'
import path from 'path';
export const app: Express = express();
//import { User } from './controllers/user';
dotenv.config({ path: `.env${process.env.NODE_ENV}` });

const publicPath = path.resolve(__dirname, './public')
app.use(express.static(publicPath) )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes)

app.get('/health', async (_req: Request, res: Response) => {
  return res.json({ status: 'ok' });
});

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000')
});

