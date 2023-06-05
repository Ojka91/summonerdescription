import GenerateFreeCreate from '@/controllers/generate_free_create';
import GeneratePremiumVersus from '@/controllers/generate_premium_versus';
import Payment from '@/controllers/payment';
import { logger } from '@/utils/logger';
import express, {
    Request,
    Response,
    Router
} from 'express';

export const create: Router = express.Router();


create.get('/create/free', async (req: Request, res: Response) => {
    try {
        const generateFreeCreateHandler = new GenerateFreeCreate()
        const response = await generateFreeCreateHandler.generate(req.query.region as string ?? '', req.query.name as string ?? '', req.query.api_key as string ?? '')
        return res.json(response);
    } catch (error) {
        return res.json((error as Error).message)
    }
})

create.post("/create/premium/order/create", async (req, res) => {
    const paymentController = new Payment()
    const order = await paymentController.createOrder();
    res.json(order);
});

create.post("/create/premium/order/process", async (req, res) => {
    try {
  
      const {
        orderId, summonerName1, region1, summonerName2, region2
      } = req.body;
      
      const paymentController = new Payment()
      const generateversusHandler = new GeneratePremiumVersus()
  
      // 1, Capture payment
      await paymentController.capturePayment(orderId);
    
      // 2, After capturing payment, if succeed, we generate versus and send it back
      const response = await generateversusHandler.generate(region1, summonerName1, region2, summonerName2)
  
      res.json(response);
    } catch (error) {
      logger.error(error, "capturingPaymentError")
      res.json({message: (error as Error).message})
    }
  });