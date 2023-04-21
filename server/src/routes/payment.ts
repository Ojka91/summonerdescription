import GenerateFreeDescription from '@/controllers/generate_free_description';
import { logger } from '@/utils/logger';
import axios from 'axios';
import express, {
  Request,
  Response,
  Router
} from 'express';

export const payment: Router = express.Router();

const {
  CLIENT_ID,
  APP_SECRET
} = process.env;
const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

payment.post("/create-paypal-order", async (req, res) => {
  const order = await createOrder();
  res.json(order);
});

payment.post("/capture-paypal-order", async (req, res) => {
  try {

    const {
      orderID
    } = req.body;
    await capturePayment(orderID);
    
    const generateDescriptionHandler = new GenerateFreeDescription()
    const responssse = await generateDescriptionHandler.generate('euw1', 'Ojka', '')
    res.json(responssse);
  } catch (error) {
    logger.error(error, "capturingPaymentError")
    res.json({message: "An unexpected error has ocurred :/"})
  }
});

async function createOrder() {
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: "1",
        },
      }, ],
    }),
  });
  const data = await response.json();
  return data;
}

// generate an access token using client id and app secret
async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64")
  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

// use the orders api to capture payment for an order
async function capturePayment(orderId: string) {
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}