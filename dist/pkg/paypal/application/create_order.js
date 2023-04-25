"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePaypalOrder {
    constructor(paypalGateway) {
        this.paypalGateway = paypalGateway;
    }
    // use the orders api to capture payment for an order
    async createOrder() {
        return await this.paypalGateway.createOrder();
    }
}
exports.default = CreatePaypalOrder;
//# sourceMappingURL=create_order.js.map