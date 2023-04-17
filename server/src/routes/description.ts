import DescriptionHandler from '@/controllers/description';
import express, { Request, Response, Router } from 'express';

export const description: Router = express.Router();


description.get('/description', async (req: Request, res: Response) => {
    const controller = new DescriptionHandler()
    const response = await controller.handle()
    console.log(response)
    return res.send(response);
})


