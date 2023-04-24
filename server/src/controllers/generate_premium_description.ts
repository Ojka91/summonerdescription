import { createChatGptHandler } from "@/pkg/chatgpt/bootstrap/chat_gpt_init";
import { createFreePrompt } from "@/pkg/core/bootstrap/free_prompt_init";
import { createGenerateSummonerMetadatadHandler } from "@/pkg/core/bootstrap/generate_summoner_payload_init";
import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";
import { SummonerData } from "@/pkg/riot/domain/summoner_data";

export default class GeneratePremiumDescription {
    public async generate(region: string, name: string) {
        try {
            if (!name) throw new Error('Summoner name is mandatory')
            if (!region) throw new Error('Select a region first')

            const getSummonerDataHandler = createGetSummonerDataHandler()
            const generateSummonerMetadata = createGenerateSummonerMetadatadHandler()
            const freePrompt = createFreePrompt()
            const chatGpt = createChatGptHandler()


            // Get raw data from riot api
            const summonerData: SummonerData = await getSummonerDataHandler.handle(region, name)

            // Create payload with key data to be part of gpt prompt
            const metadata = generateSummonerMetadata.getForDescription(summonerData, name)

            // Get prompt for free tier
            const prompt = freePrompt.getDescriptionPrompt()

            
            //console.log(summonerPrompt)
            return await chatGpt.chat(`${prompt} ${metadata}`)


        } catch (error) {
            throw new Error((error as Error).message)    
        }
    }   
}