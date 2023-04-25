"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paypal_init_1 = require("../pkg/paypal/bootstrap/paypal_init");
class Payment {
    async createOrder() {
        const handler = (0, paypal_init_1.createCreatePaypalOrder)();
        return handler.createOrder();
    }
    async capturePayment(orderId) {
        const handler = (0, paypal_init_1.createCapturePaymentHandler)();
        return handler.capturePayment(orderId);
    }
}
exports.default = Payment;
//# sourceMappingURL=payment.js.map