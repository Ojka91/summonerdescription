"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatGpt {
    constructor(chatGptGateway) {
        this.chatGptGateway = chatGptGateway;
    }
    // Chat with chatGPT
    async chat(prompt, apiKey) {
        return await this.chatGptGateway.chat(prompt, apiKey);
    }
    // Create image with davinci
    async createImage(prompt, apiKey) {
        return await this.chatGptGateway.createImage(prompt, apiKey);
    }
}
exports.default = ChatGpt;
//# sourceMappingURL=chat_gpt.js.map