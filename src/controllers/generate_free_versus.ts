import { createChatGptHandler } from "@/pkg/chatgpt/bootstrap/chat_gpt_init";
import { createPrompt } from "@/pkg/core/bootstrap/prompt_init";
import { createGenerateSummonerMetadatadHandler } from "@/pkg/core/bootstrap/generate_summoner_payload_init";
import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";
import { SummonerData } from "@/pkg/riot/domain/summoner_data";
import { RateLimiterSingleton } from "@/utils/rate_limiter";

export default class GenerateFreeVersus {

    public async generate(region1: string, name1: string, region2: string, name2: string, openAiApiKey: string) {
        try {
            if (!name1 || !name2) throw new Error('Both summoner names are mandatory')
            if (!region1 || !region2) throw new Error('Both regions are mandatory')
            if (!openAiApiKey) {
                const rateLimiter = RateLimiterSingleton.getInstance()
                rateLimiter.checkRateLimit()
            }

            const getSummonerDataHandler = createGetSummonerDataHandler()
            const generateSummonerMetadata = createGenerateSummonerMetadatadHandler()
            const prompt = createPrompt()
            const chatGpt = createChatGptHandler()
            

            // Get raw data from riot api
            const summonerData1: SummonerData = await getSummonerDataHandler.handle(region1, name1)
            const summonerData2: SummonerData = await getSummonerDataHandler.handle(region2, name2)

            // Create payload with key data to be part of gpt prompt
            const metadata1 = generateSummonerMetadata.getForDescription(summonerData1, name1)
            const metadata2 = generateSummonerMetadata.getForDescription(summonerData2, name2)

            // Get prompt for versus
            const versusPrompt = prompt.getVersusPrompt()

            return await chatGpt.chat(`${versusPrompt} ${metadata1} ${metadata2}`, openAiApiKey)

        } catch (error) {
            throw new Error((error as Error).message)    
        }
    }   

}