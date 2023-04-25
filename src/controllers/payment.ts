import { createCapturePaymentHandler, createCreatePaypalOrder } from "@/pkg/paypal/bootstrap/paypal_init";


export default class Payment {

    public async createOrder() {
        const handler = createCreatePaypalOrder()
        return handler.createOrder()
    }

    public async capturePayment(orderId: string) {
        const handler = createCapturePaymentHandler()
        return handler.capturePayment(orderId)
    }

}