export default interface ChatGptGatewayInterface {
    chat: (prompt: string, apiKey?: string) => Promise<string>
  }
  