import PaypalGatewayInterface from "./paypal_gateway";

export default class CapturePayment {
    constructor(
        public paypalGateway: PaypalGatewayInterface
    ) {}

    // use the orders api to capture payment for an order
    public async capturePayment(orderId: string) {
       return await this.paypalGateway.capturePayment(orderId);
    }
}