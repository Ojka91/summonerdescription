import GenerateSummonerPayload from "../application/generate_summoner_payload";

export const createGenerateSummonerPayloadHandler = (): GenerateSummonerPayload => {

    return new GenerateSummonerPayload()
}