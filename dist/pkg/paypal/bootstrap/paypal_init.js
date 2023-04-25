"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreatePaypalOrder = exports.createCapturePaymentHandler = void 0;
const capture_payment_1 = __importDefault(require("../application/capture_payment"));
const create_order_1 = __importDefault(require("../application/create_order"));
const paypal_gateway_1 = require("../infraestructure/paypal_gateway");
const createCapturePaymentHandler = () => {
    const CLIENT_ID = process.env.CLIENT_ID ?? '';
    const APP_SECRET = process.env.APP_SECRET ?? '';
    const BASE_URL = process.env.PAYPAL_BASE_URL ?? '';
    return new capture_payment_1.default(new paypal_gateway_1.PaypalGateway(CLIENT_ID, APP_SECRET, BASE_URL));
};
exports.createCapturePaymentHandler = createCapturePaymentHandler;
const createCreatePaypalOrder = () => {
    const CLIENT_ID = process.env.CLIENT_ID ?? '';
    const APP_SECRET = process.env.APP_SECRET ?? '';
    const BASE_URL = process.env.PAYPAL_BASE_URL ?? '';
    return new create_order_1.default(new paypal_gateway_1.PaypalGateway(CLIENT_ID, APP_SECRET, BASE_URL));
};
exports.createCreatePaypalOrder = createCreatePaypalOrder;
//# sourceMappingURL=paypal_init.js.map