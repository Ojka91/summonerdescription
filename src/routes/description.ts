import GenerateFreeDescription from '@/controllers/generate_free_description';
import GeneratePremiumDescription from '@/controllers/generate_premium_description';
import Payment from '@/controllers/payment';
import { logger } from '@/utils/logger';
import express, {
    Request,
    Response,
    Router
} from 'express';

export const description: Router = express.Router();


description.get('/description/free', async (req: Request, res: Response) => {
    try {
        const generateDescriptionHandler = new GenerateFreeDescription()
        const response = await generateDescriptionHandler.generate(req.query.region as string ?? 'euw1', req.query.name as string ?? '', req.query.api_key as string ?? '')
        return res.json(response);
    } catch (error) {
        return res.json((error as Error).message)
    }
})

description.post("/description/premium/order/create", async (req, res) => {
    const paymentController = new Payment()
    const order = await paymentController.createOrder();
    res.json(order);
});

description.post("/description/premium/order/process", async (req, res) => {
    try {
  
      const {
        orderId, summonerName, region
      } = req.body;
      
      const paymentController = new Payment()
      const generateDescriptionHandler = new GeneratePremiumDescription()
  
      // 1, Capture payment
      await paymentController.capturePayment(orderId);
    
      // 2, After capturing payment, if succeed, we generate description and send it back
      const response = await generateDescriptionHandler.generate(region, summonerName)
  
      res.json(response);
    } catch (error) {
      logger.error(error, "capturingPaymentError")
      res.json({message: (error as Error).message})
    }
  });