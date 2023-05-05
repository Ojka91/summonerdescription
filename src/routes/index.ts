import express from 'express';
import { description } from '@/routes/description';
import { versus } from './versus';
const pino = require('pino-http')()


export const routes = express.Router();
routes.use(pino)

routes.use(description);
routes.use(versus);
