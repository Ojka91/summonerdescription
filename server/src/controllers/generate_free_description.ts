import { createFreePrompt } from "@/pkg/core/bootstrap/free_prompt_init";
import { createGenerateSummonerPayloadHandler } from "@/pkg/core/bootstrap/generate_summoner_payload_init";
import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";

export default class GenerateFreeDescription {
    public async generate(region: string, name: string, openAiApiKey: string) {
        try {
            const getSummonerDataHandler = createGetSummonerDataHandler()
            const generateSummonerPayload = createGenerateSummonerPayloadHandler()
            const freePrompt = createFreePrompt()

            // Get raw data from riot api
            const summonerData = await getSummonerDataHandler.handle(region, name)

            // Create payload with key data to be part of gpt prompt
            const summonerPrompt = generateSummonerPayload.generate(summonerData, name)

            // Get prompt for free tier
            const prompt = freePrompt.get()

            
            console.log(summonerPrompt)
            return summonerPrompt


        } catch (error) {
            throw new Error((error as Error).message)    
        }
    }   
}