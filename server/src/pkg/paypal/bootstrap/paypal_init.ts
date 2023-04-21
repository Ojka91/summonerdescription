
import CapturePayment from "../application/capture_payment";
import CreatePaypalOrder from "../application/create_order";
import { PaypalGateway } from '../infraestructure/paypal_gateway';

export const createCapturePaymentHandler = (): CapturePayment => {

    const CLIENT_ID = process.env.CLIENT_ID ?? ''
    const APP_SECRET = process.env.APP_SECRET ?? ''
    const BASE_URL = process.env.PAYPAL_BASE_URL ?? ''

    return new CapturePayment(
        new PaypalGateway(CLIENT_ID, APP_SECRET, BASE_URL)
    )
}

export const createCreatePaypalOrder = (): CreatePaypalOrder => {

    const CLIENT_ID = process.env.CLIENT_ID ?? ''
    const APP_SECRET = process.env.APP_SECRET ?? ''
    const BASE_URL = process.env.PAYPAL_BASE_URL ?? ''

    return new CreatePaypalOrder(
        new PaypalGateway(CLIENT_ID, APP_SECRET, BASE_URL)
    )
}