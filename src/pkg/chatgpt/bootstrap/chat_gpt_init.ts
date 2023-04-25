import ChatGptGatewayInterface from "../application/chat_gpt_gateway";
import ChatGpt from "../application/chat_gpt";
import { ChatGptGateway } from "../infraestructure/chat_gpt_gateway";

export const createChatGptHandler = (): ChatGptGatewayInterface => {

    return new ChatGpt(
        new ChatGptGateway()
    )
}