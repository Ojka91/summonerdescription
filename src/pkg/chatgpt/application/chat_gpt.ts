import ChatGptGatewayInterface from "./chat_gpt_gateway";

export default class ChatGpt {
    constructor(
        public chatGptGateway: ChatGptGatewayInterface
    ) {}

    // Chat with chatGPT
    public async chat(prompt: string, apiKey?: string) {
       return await this.chatGptGateway.chat(prompt, apiKey);
    }

    // Create image with davinci
    public async createImage(prompt: string, apiKey?: string) {
       return await this.chatGptGateway.createImage(prompt, apiKey);
    }
}