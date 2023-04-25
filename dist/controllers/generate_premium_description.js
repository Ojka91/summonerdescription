"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const free_prompt_init_1 = require("../pkg/core/bootstrap/free_prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
class GeneratePremiumDescription {
    async generate(region, name) {
        try {
            if (!name)
                throw new Error('Summoner name is mandatory');
            if (!region)
                throw new Error('Select a region first');
            const getSummonerDataHandler = (0, get_summoner_data_init_1.createGetSummonerDataHandler)();
            const generateSummonerMetadata = (0, generate_summoner_payload_init_1.createGenerateSummonerMetadatadHandler)();
            const freePrompt = (0, free_prompt_init_1.createFreePrompt)();
            const chatGpt = (0, chat_gpt_init_1.createChatGptHandler)();
            // Get raw data from riot api
            const summonerData = await getSummonerDataHandler.handle(region, name);
            // Create payload with key data to be part of gpt prompt
            const metadata = generateSummonerMetadata.getForDescription(summonerData, name);
            // Get prompt for free tier
            const prompt = freePrompt.getDescriptionPrompt();
            //console.log(summonerPrompt)
            return await chatGpt.chat(`${prompt} ${metadata}`);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GeneratePremiumDescription;
//# sourceMappingURL=generate_premium_description.js.map