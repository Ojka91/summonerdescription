"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const free_prompt_init_1 = require("../pkg/core/bootstrap/free_prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
class GeneratePremiumVersus {
    async generate(region1, name1, region2, name2) {
        try {
            if (!name1 || !name2)
                throw new Error('Both summoner names are mandatory');
            if (!region1 || !region2)
                throw new Error('Both regions are mandatory');
            const getSummonerDataHandler = (0, get_summoner_data_init_1.createGetSummonerDataHandler)();
            const generateSummonerMetadata = (0, generate_summoner_payload_init_1.createGenerateSummonerMetadatadHandler)();
            const freePrompt = (0, free_prompt_init_1.createFreePrompt)();
            const chatGpt = (0, chat_gpt_init_1.createChatGptHandler)();
            // Get raw data from riot api
            const summonerData1 = await getSummonerDataHandler.handle(region1, name1);
            const summonerData2 = await getSummonerDataHandler.handle(region2, name2);
            // Create payload with key data to be part of gpt prompt
            const metadata1 = generateSummonerMetadata.getForDescription(summonerData1, name1);
            const metadata2 = generateSummonerMetadata.getForDescription(summonerData2, name2);
            // Get prompt for free tier
            const prompt = freePrompt.getVersusPrompt();
            return await chatGpt.chat(`${prompt} ${metadata1} ${metadata2}`);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GeneratePremiumVersus;
//# sourceMappingURL=generate_premium_versus.js.map