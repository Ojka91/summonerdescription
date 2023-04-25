"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const generate_free_description_1 = __importDefault(require("../controllers/generate_free_description"));
const generate_premium_description_1 = __importDefault(require("../controllers/generate_premium_description"));
const payment_1 = __importDefault(require("../controllers/payment"));
const logger_1 = require("../utils/logger");
const express_1 = __importDefault(require("express"));
exports.description = express_1.default.Router();
exports.description.get('/description/free', async (req, res) => {
    try {
        const generateDescriptionHandler = new generate_free_description_1.default();
        const response = await generateDescriptionHandler.generate(req.query.region ?? 'euw1', req.query.name ?? '', req.query.api_key ?? '');
        return res.json(response);
    }
    catch (error) {
        return res.json(error.message);
    }
});
exports.description.post("/description/premium/order/create", async (req, res) => {
    const paymentController = new payment_1.default();
    const order = await paymentController.createOrder();
    res.json(order);
});
exports.description.post("/description/premium/order/process", async (req, res) => {
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
//# sourceMappingURL=description.js.map