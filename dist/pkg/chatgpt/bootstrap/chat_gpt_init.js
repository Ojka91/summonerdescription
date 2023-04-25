"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatGptHandler = void 0;
const chat_gpt_1 = __importDefault(require("../application/chat_gpt"));
const chat_gpt_gateway_1 = require("../infraestructure/chat_gpt_gateway");
const createChatGptHandler = () => {
    return new chat_gpt_1.default(new chat_gpt_gateway_1.ChatGptGateway());
};
exports.createChatGptHandler = createChatGptHandler;
//# sourceMappingURL=chat_gpt_init.js.map