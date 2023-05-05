import PaypalGatewayInterface from "./paypal_gateway";

export default class CreatePaypalOrder {
    constructor(
        public paypalGateway: PaypalGatewayInterface
    ) {}

    // create a paypal order (not capturing funds yet)
    public async createOrder() {
       return await this.paypalGateway.createOrder();
    }
}