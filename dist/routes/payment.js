"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const generate_premium_description_1 = __importDefault(require("../controllers/generate_premium_description"));
const payment_1 = __importDefault(require("../controllers/payment"));
const logger_1 = require("../utils/logger");
const express_1 = __importDefault(require("express"));
exports.payment = express_1.default.Router();
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};
exports.payment.post("/create-paypal-order", async (req, res) => {
    const paymentController = new payment_1.default();
    const order = await paymentController.createOrder();
    res.json(order);
});
exports.payment.post("/capture-paypal-order", async (req, res) => {
    try {
        const { orderId, summonerName, region } = req.body;
        const paymentController = new payment_1.default();
        const generateDescriptionHandler = new generate_premium_description_1.default();
        // 1, Capture payment
        await paymentController.capturePayment(orderId);
        // 2, After capturing payment, if succeed, we generate description and send it back
        const response = await generateDescriptionHandler.generate(region, summonerName);
        res.json(response);
    }
    catch (error) {
        logger_1.logger.error(error, "capturingPaymentError");
        res.json({ message: error.message });
    }
});
//# sourceMappingURL=payment.js.map