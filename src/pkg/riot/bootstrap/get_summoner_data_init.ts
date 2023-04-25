import GetSummonerDataHandler from "../application/get_summoner_data_handler";
import { RiotGateway } from "../infraestructure/riot_gateway";
import axios from 'axios'

export const createGetSummonerDataHandler = (): GetSummonerDataHandler => {

    const riotEndpoint = process.env.RIOT_ENDPOINT ?? ''
    const riotApiKey = process.env.RIOT_API_KEY ?? ''

    return new GetSummonerDataHandler(
        new RiotGateway(axios, riotEndpoint, riotApiKey)
    )
}