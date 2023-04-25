"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalGateway = void 0;
/**
 * RiotGateway.
 * This class contains the necessary methods to call riot api
 */
class PaypalGateway {
    constructor(CLIENT_ID, APP_SECRET, PAYPAL_BASE_URL) {
        this.CLIENT_ID = CLIENT_ID;
        this.APP_SECRET = APP_SECRET;
        this.PAYPAL_BASE_URL = PAYPAL_BASE_URL;
    }
    async createOrder() {
        const accessToken = await this.generateAccessToken();
        const url = `${this.PAYPAL_BASE_URL}/v2/checkout/orders`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [{
                        amount: {
                            currency_code: "USD",
                            value: "1",
                        },
                    },],
            }),
        });
        const data = await response.json();
        return data;
    }
    // use the orders api to capture payment for an order
    async capturePayment(orderId) {
        const accessToken = await this.generateAccessToken();
        const url = `${this.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    }
    // generate an access token using client id and app secret
    async generateAccessToken() {
        const auth = Buffer.from(this.CLIENT_ID + ":" + this.APP_SECRET).toString("base64");
        const response = await fetch(`${this.PAYPAL_BASE_URL}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const data = await response.json();
        return data.access_token;
    }
}
exports.PaypalGateway = PaypalGateway;
//# sourceMappingURL=paypal_gateway.js.map