export default interface PaypalGatewayInterface {
    createOrder: () => Promise<any>
    capturePayment: (orderId: string) => Promise<any>
  }
  