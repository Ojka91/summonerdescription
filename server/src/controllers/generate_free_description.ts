import GenerateSummonerPayload from "@/pkg/core/application/generate_summoner_payload";
import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";

export default class GenerateFreeDescription {
    public async generate(region: string, name: string, openAiApiKey: string) {
        try {
            const getSummonerDataHandler = createGetSummonerDataHandler()
            const generateSummonerPayload = new GenerateSummonerPayload()

            // Get raw data from riot api
            const summonerData = await getSummonerDataHandler.handle(region, name)
            
            // Create payload with key data to be part of gpt prompt
            const summonerPrompt = generateSummonerPayload.generate(summonerData, name)

            console.log(summonerPrompt)
            return summonerPrompt


        } catch (error) {
            throw new Error((error as Error).message)    
        }
    }   
}