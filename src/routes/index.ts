import express from 'express';
import { description } from '@/routes/description';
import { versus } from './versus';
import { create } from './create_champ';
const pino = require('pino-http')()


export const routes = express.Router();
routes.use(pino)

routes.use(description);
routes.use(versus);
routes.use(create);
