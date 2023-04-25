"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CapturePayment {
    constructor(paypalGateway) {
        this.paypalGateway = paypalGateway;
    }
    // use the orders api to capture payment for an order
    async capturePayment(orderId) {
        return await this.paypalGateway.capturePayment(orderId);
    }
}
exports.default = CapturePayment;
//# sourceMappingURL=capture_payment.js.map