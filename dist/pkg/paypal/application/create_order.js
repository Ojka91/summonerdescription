"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePaypalOrder {
    constructor(paypalGateway) {
        this.paypalGateway = paypalGateway;
    }
    // create a paypal order (not capturing funds yet)
    async createOrder() {
        return await this.paypalGateway.createOrder();
    }
}
exports.default = CreatePaypalOrder;
//# sourceMappingURL=create_order.js.map