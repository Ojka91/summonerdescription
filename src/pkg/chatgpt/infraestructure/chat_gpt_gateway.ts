import { logger } from "@/utils/logger";
import { Configuration, OpenAIApi } from "openai";
import ChatGptGatewayInterface from "../application/chat_gpt_gateway";


export class ChatGptGateway implements ChatGptGatewayInterface {

    private openAi: OpenAIApi
    private apiKey = process.env.OPENAI_API_KEY ?? ''

    constructor () {
        this.openAi = new OpenAIApi(new Configuration({
            apiKey: this.apiKey
        }))
    }

      public async chat(prompt: string, providedApiKey?: string): Promise<string> {
        this.openAi = new OpenAIApi(new Configuration({
            apiKey: providedApiKey ? providedApiKey : this.apiKey
        }))
        try {
            const response =  await this.openAi.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages:[{
                    role: "system", content: 'You are a top professional League of Legends caster'
                },
                {
                    role: "user", content: prompt
                }],
                temperature: 0.7,
                max_tokens: 512
            })

            return response?.data?.choices[0]?.message?.content ?? 'Hmm a problem occured. Please, contact support'
        } catch (error: any) {
           logger.error(error?.response?.data?.error?.message, 'chatGptError')
           throw new Error(error?.response?.data?.error?.message)
        }
      }
}
