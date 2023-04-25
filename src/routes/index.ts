import express from 'express';
import { description } from '@/routes/description';
const pino = require('pino-http')()


export const routes = express.Router();
routes.use(pino)

routes.use(description);
