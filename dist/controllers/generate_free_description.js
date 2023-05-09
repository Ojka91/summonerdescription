"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const free_prompt_init_1 = require("../pkg/core/bootstrap/free_prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
const rateLimiter_1 = require("../utils/rateLimiter");
class GenerateFreeDescription {
    async generate(region, name, openAiApiKey) {
        try {
            if (!name)
                throw new Error('Summoner name is mandatory');
            if (!region)
                throw new Error('Select a region first');
            if (!openAiApiKey) {
                const rateLimiter = rateLimiter_1.RateLimiterSingleton.getInstance();
                rateLimiter.checkRateLimit();
            }
            const getSummonerDataHandler = (0, get_summoner_data_init_1.createGetSummonerDataHandler)();
            const generateSummonerMetadata = (0, generate_summoner_payload_init_1.createGenerateSummonerMetadatadHandler)();
            const freePrompt = (0, free_prompt_init_1.createFreePrompt)();
            const chatGpt = (0, chat_gpt_init_1.createChatGptHandler)();
            // Get raw data from riot api
            const summonerData = await getSummonerDataHandler.handle(region, name);
            // Create payload with key data to be part of gpt prompt
            const metadata = generateSummonerMetadata.getForDescription(summonerData, name);
            console.log(metadata);
            // Get prompt for free tier
            const prompt = freePrompt.getDescriptionPrompt();
            return await chatGpt.chat(`${prompt} ${metadata}`, openAiApiKey);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GenerateFreeDescription;
//# sourceMappingURL=generate_free_description.js.map