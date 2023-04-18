import GenerateFreeDescription from '@/controllers/generate_free_description';
import express, { Request, Response, Router } from 'express';

export const description: Router = express.Router();


description.get('/free/description', async (req: Request, res: Response) => {
    try {
        const generateDescriptionHandler = new GenerateFreeDescription()
        const response = await generateDescriptionHandler.generate(req.query.region as string ?? 'euw1', req.query.name as string ?? '', req.query.api_key as string ?? '')
        return res.send(response);
    } catch (error) {
        return res.status(500).send((error as Error).message)
    }
})


