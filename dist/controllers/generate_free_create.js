"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const free_prompt_init_1 = require("../pkg/core/bootstrap/free_prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
const logger_1 = require("../utils/logger");
const rate_limiter_1 = require("../utils/rate_limiter");
class GenerateFreeCreate {
    async generate(region, name, openAiApiKey) {
        try {
            if (!name)
                throw new Error('Summoner name is mandatory');
            if (!region)
                throw new Error('Region is mandatory');
            if (!openAiApiKey) {
                const rateLimiter = rate_limiter_1.RateLimiterSingleton.getInstance();
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
            // Get prompt for free tier
            const prompt = freePrompt.getCreatePrompt();
            const gptResponse = await chatGpt.chat(`${prompt} ${metadata}`, openAiApiKey);
            let champDescription;
            let appearanceDescription;
            try {
                champDescription = JSON.parse(gptResponse)?.champion;
                appearanceDescription = JSON.parse(gptResponse)?.appearance;
            }
            catch (error) {
                logger_1.logger.error(`ChatGPT response: ${gptResponse}`);
                throw new Error("Error parsing data from chat gpt: " + error.message);
            }
            if (!champDescription || !appearanceDescription) {
                logger_1.logger.error({ gptResponse, appearanceDescription });
                throw new Error('Oops.. we have been unable to create a new champ. Please report this to the site owner');
            }
            const image = await chatGpt.createImage(appearanceDescription);
            return {
                champDescription,
                image
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GenerateFreeCreate;
//# sourceMappingURL=generate_free_create.js.map