import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";

export default class GenerateFreeDescription {
    public async generate(region: string, name: string, openAiApiKey: string) {
        try {
            const getSummonerDataHandler = createGetSummonerDataHandler()
            return await getSummonerDataHandler.handle(region, name)
        } catch (error) {
            throw new Error((error as Error).message)    
        }
    }   
}