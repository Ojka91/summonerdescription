import { createChatGptHandler } from "@/pkg/chatgpt/bootstrap/chat_gpt_init";
import { createPrompt } from "@/pkg/core/bootstrap/prompt_init";
import { createGenerateSummonerMetadatadHandler } from "@/pkg/core/bootstrap/generate_summoner_payload_init";
import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";
import { SummonerData } from "@/pkg/riot/domain/summoner_data";
import { logger } from "@/utils/logger";

export default class GeneratePremiumCreateChamp {

    public async generate(region: string, name: string) {
        try {
            if (!name) throw new Error('Summoner name is mandatory')
            if (!region ) throw new Error('Region is mandatory')
  
            const getSummonerDataHandler = createGetSummonerDataHandler()
            const generateSummonerMetadata = createGenerateSummonerMetadatadHandler()
            const freePrompt = createPrompt()
            const chatGpt = createChatGptHandler()
            

            // Get raw data from riot api
            const summonerData: SummonerData = await getSummonerDataHandler.handle(region, name)

            // Create payload with key data to be part of gpt prompt
            const metadata = generateSummonerMetadata.getForDescription(summonerData, name)

            // Get prompt for free tier
            const prompt = freePrompt.getCreatePrompt()

            const gptResponse = await chatGpt.chat(`${prompt} ${metadata}`)

            let champDescription
            let appearanceDescription

            try {
                champDescription = JSON.parse(gptResponse)?.champion
                appearanceDescription = JSON.parse(gptResponse)?.appearance
            } catch (error) {
                logger.error(`ChatGPT response: ${gptResponse}`)
                throw new Error("Error parsing data from chat gpt: " + (error as Error).message)
            }

            if (!champDescription || !appearanceDescription) {
                logger.error({gptResponse, appearanceDescription})
                throw new Error('Oops.. we have been unable to create a new champ. Please report this to the site owner')
            }
            const image = await chatGpt.createImage(appearanceDescription);

            return {
                champDescription,
                image
            }
        } catch (error) {
            throw new Error((error as Error).message)    
        }
    }   

}