import { Match } from "../domain/match";
import { Summoner } from "../domain/summoner";
import RiotGatewayInterface from "./riot_gateway";

export default class GetSummonerDataHandler {

constructor (
    public riotGateway: RiotGatewayInterface
  ) {}

  public async handle (region: string, summonerName: string) {
    const summoner: Summoner = await this.riotGateway.getSummonerByName(summonerName, 'euw1')
    console.log("summoner", summoner)
    const matches: string[] = await this.riotGateway.getMatchesByPuuid(summoner.puuid, 'europe')
    console.log("matches", matches)
    const match: Match = await this.riotGateway.getMatchById(matches[0], 'europe')
    console.log("match", match)
  }
}