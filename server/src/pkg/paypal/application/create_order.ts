import PaypalGatewayInterface from "./paypal_gateway";

export default class CreatePaypalOrder {
    constructor(
        public paypalGateway: PaypalGatewayInterface
    ) {}

    // use the orders api to capture payment for an order
    public async createOrder() {
       return await this.paypalGateway.createOrder();
    }
}