"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptGateway = void 0;
const logger_1 = require("../../../utils/logger");
const openai_1 = require("openai");
class ChatGptGateway {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY ?? '';
        this.openAi = new openai_1.OpenAIApi(new openai_1.Configuration({
            apiKey: this.apiKey
        }));
    }
    async chat(prompt, providedApiKey) {
        this.openAi = new openai_1.OpenAIApi(new openai_1.Configuration({
            apiKey: providedApiKey ? providedApiKey : this.apiKey
        }));
        try {
            const response = await this.openAi.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{
                        role: "system", content: 'You are a top professional League of Legends caster'
                    },
                    {
                        role: "user", content: prompt
                    }],
                temperature: 0.7,
                max_tokens: 512
            });
            return response?.data?.choices[0]?.message?.content ?? 'Hmm a problem occured. Please, contact support';
        }
        catch (error) {
            logger_1.logger.error(error?.response?.data?.error?.message, 'chatGptError');
            throw new Error(error?.response?.data?.error?.message);
        }
    }
}
exports.ChatGptGateway = ChatGptGateway;
//# sourceMappingURL=chat_gpt_gateway.js.map