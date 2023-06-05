"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const prompt_init_1 = require("../pkg/core/bootstrap/prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
const rate_limiter_1 = require("../utils/rate_limiter");
class GenerateFreeDescription {
    async generate(region, name, openAiApiKey) {
        try {
            if (!name)
                throw new Error('Summoner name is mandatory');
            if (!region)
                throw new Error('Select a region first');
            if (!openAiApiKey) {
                const rateLimiter = rate_limiter_1.RateLimiterSingleton.getInstance();
                rateLimiter.checkRateLimit();
            }
            const getSummonerDataHandler = (0, get_summoner_data_init_1.createGetSummonerDataHandler)();
            const generateSummonerMetadata = (0, generate_summoner_payload_init_1.createGenerateSummonerMetadatadHandler)();
            const prompt = (0, prompt_init_1.createPrompt)();
            const chatGpt = (0, chat_gpt_init_1.createChatGptHandler)();
            // Get raw data from riot api
            const summonerData = await getSummonerDataHandler.handle(region, name);
            // Create payload with key data to be part of gpt prompt
            const metadata = generateSummonerMetadata.getForDescription(summonerData, name);
            console.log(metadata);
            // Get prompt for description
            const descriptionPrompt = prompt.getDescriptionPrompt();
            return await chatGpt.chat(`${descriptionPrompt} ${metadata}`, openAiApiKey);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GenerateFreeDescription;
//# sourceMappingURL=generate_free_description.js.map