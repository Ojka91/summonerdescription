import { createGetSummonerDataHandler } from "@/pkg/riot/bootstrap/get_summoner_data_init";

export default class DescriptionHandler {
    public async handle() {
        const handler = createGetSummonerDataHandler()
       return await handler.handle('', 'Ojka')
    }
}