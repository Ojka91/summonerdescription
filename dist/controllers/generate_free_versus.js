"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_gpt_init_1 = require("../pkg/chatgpt/bootstrap/chat_gpt_init");
const free_prompt_init_1 = require("../pkg/core/bootstrap/free_prompt_init");
const generate_summoner_payload_init_1 = require("../pkg/core/bootstrap/generate_summoner_payload_init");
const get_summoner_data_init_1 = require("../pkg/riot/bootstrap/get_summoner_data_init");
const rate_limiter_1 = require("../utils/rate_limiter");
class GenerateFreeVersus {
    async generate(region1, name1, region2, name2, openAiApiKey) {
        try {
            if (!name1 || !name2)
                throw new Error('Both summoner names are mandatory');
            if (!region1 || !region2)
                throw new Error('Both regions are mandatory');
            if (!openAiApiKey) {
                const rateLimiter = rate_limiter_1.RateLimiterSingleton.getInstance();
                rateLimiter.checkRateLimit();
            }
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
            /**
             * TODO !!! for image and champ generation
             * Based on this data from league of legends game:
{"playerRank":"Player is rank SILVER II with 39 wins and 56 losses","name":"Ojka","isInHotStreak":false,"gamesInfo":["Player played CLASSIC game type. Player lost the game with 14/7/6 playing Akali MIDDLE","Player played ARAM game type. Player lost the game with 9/12/16 playing Yasuo ","Player played CLASSIC game type. Player lost the game with 6/8/3 playing Akali MIDDLE","Player played CLASSIC game type. Player lost the game with 11/10/5 playing Akali MIDDLE","Player played ARAM game type. Player lost the game with 12/13/18 playing Kassadin ","Player played ARAM game type. Player lost the game with 12/16/23 playing Maokai ","Player played ARAM game type. Player lost the game with 7/13/34 playing Ahri ","Player played CLASSIC game type. Player won the game with 8/7/10 playing Akali MIDDLE","Player played ARAM game type. Player lost the game with 14/15/36 playing Lissandra ","Player played CLASSIC game type. Player lost the game with 5/8/0 playing Akali MIDDLE","Player played ARAM game type. Player lost the game with 15/16/25 playing Fizz ","Player played CLASSIC game type. Player lost the game with 10/12/9 playing Lux MIDDLE","Player played CLASSIC game type. Player won the game with 16/7/8 playing Akali MIDDLE","Player played CLASSIC game type. Player lost the game with 5/7/7 playing MonkeyKing JUNGLE","Player played ARAM game type. Player won the game with 6/10/34 playing Anivia "]}

Create a new champion League of legends champion. Be creative
Generate the result in a json following this example
{
    "champion": "", // here it goes all the description of the champion as string, spells, abilities...
    "appearance": "" // here it goes ONLY the appearance description,as string maximum 100 charactes
}
             */
            return await chatGpt.chat(`${prompt} ${metadata1} ${metadata2}`, openAiApiKey);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GenerateFreeVersus;
//# sourceMappingURL=generate_free_versus.js.map