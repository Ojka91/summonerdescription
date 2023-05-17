"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const prompt_init_1 = require("../pkg/core/bootstrap/prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
const rateLimiter_1 = require("../utils/rateLimiter");
class GenerateFreeVersus {
    async generate(region1, name1, region2, name2, openAiApiKey) {
        try {
            if (!name1 || !name2)
                throw new Error('Both summoner names are mandatory');
            if (!region1 || !region2)
                throw new Error('Both regions are mandatory');
            if (!openAiApiKey) {
                const rateLimiter = rateLimiter_1.RateLimiterSingleton.getInstance();
                rateLimiter.checkRateLimit();
            }
            const getSummonerDataHandler = (0, get_summoner_data_init_1.createGetSummonerDataHandler)();
            const generateSummonerMetadata = (0, generate_summoner_payload_init_1.createGenerateSummonerMetadatadHandler)();
            const prompt = (0, prompt_init_1.createPrompt)();
            const chatGpt = (0, chat_gpt_init_1.createChatGptHandler)();
            // Get raw data from riot api
            const summonerData1 = await getSummonerDataHandler.handle(region1, name1);
            const summonerData2 = await getSummonerDataHandler.handle(region2, name2);
            // Create payload with key data to be part of gpt prompt
            const metadata1 = generateSummonerMetadata.getForDescription(summonerData1, name1);
            const metadata2 = generateSummonerMetadata.getForDescription(summonerData2, name2);
            // Get prompt for versus
            const versusPrompt = prompt.getVersusPrompt();
            return await chatGpt.chat(`${versusPrompt} ${metadata1} ${metadata2}`, openAiApiKey);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GenerateFreeVersus;
//# sourceMappingURL=generate_free_versus.js.map