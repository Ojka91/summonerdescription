import GenerateFreeDescription from '@/controllers/generate_free_description';
import GeneratePremiumDescription from '@/controllers/generate_premium_description';
import Payment from '@/controllers/payment';
import { logger } from '@/utils/logger';
import axios from 'axios';
import express, {
  Request,
  Response,
  Router
} from 'express';

export const payment: Router = express.Router();


const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

payment.post("/create-paypal-order", async (req, res) => {
  const paymentController = new Payment()
  const order = await paymentController.createOrder();
  res.json(order);
});

payment.post("/capture-paypal-order", async (req, res) => {
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





