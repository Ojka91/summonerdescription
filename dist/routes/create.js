"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const generate_free_create_1 = __importDefault(require("../controllers/generate_free_create"));
const generate_premium_versus_1 = __importDefault(require("../controllers/generate_premium_versus"));
const payment_1 = __importDefault(require("../controllers/payment"));
const logger_1 = require("../utils/logger");
const express_1 = __importDefault(require("express"));
exports.create = express_1.default.Router();
exports.create.get('/create/free', async (req, res) => {
    try {
        const generateFreeCreateHandler = new generate_free_create_1.default();
        const response = await generateFreeCreateHandler.generate(req.query.region ?? '', req.query.name ?? '', req.query.api_key ?? '');
        return res.json(response);
    }
    catch (error) {
        return res.json(error.message);
    }
});
exports.create.post("/create/premium/order/create", async (req, res) => {
    const paymentController = new payment_1.default();
    const order = await paymentController.createOrder();
    res.json(order);
});
exports.create.post("/create/premium/order/process", async (req, res) => {
    try {
        const { orderId, summonerName1, region1, summonerName2, region2 } = req.body;
        const paymentController = new payment_1.default();
        const generateversusHandler = new generate_premium_versus_1.default();
        // 1, Capture payment
        await paymentController.capturePayment(orderId);
        // 2, After capturing payment, if succeed, we generate versus and send it back
        const response = await generateversusHandler.generate(region1, summonerName1, region2, summonerName2);
        res.json(response);
    }
    catch (error) {
        logger_1.logger.error(error, "capturingPaymentError");
        res.json({ message: error.message });
    }
});
//# sourceMappingURL=create.js.map