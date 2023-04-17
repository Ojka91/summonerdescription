import { League } from "../domain/league";
import { Match } from "../domain/match";
import { regionRouter } from "../domain/region_router";
import { Summoner } from "../domain/summoner";
import { SummonerData } from "../domain/summoner_data";
import RiotGatewayInterface from "./riot_gateway";

export default class GetSummonerDataHandler {

constructor (
    public riotGateway: RiotGatewayInterface
  ) {}

  public async handle (region: string, summonerName: string): Promise<SummonerData> {
    console.time("fetchingRiot");
    try {
      
      const summoner: Summoner = await this.riotGateway.getSummonerByName(summonerName, region)
      const leagues: League[] = await this.riotGateway.getSummonerLeague(summoner.id, region)
      
      const matchesId: string[] = await this.riotGateway.getMatchesByPuuid(summoner.puuid, regionRouter[region])
      
      let matches: Match[] = []
      for (const match of matchesId) {
        matches.push(await this.riotGateway.getMatchById(match, regionRouter[region]))
      }
      
      console.timeEnd("fetchingRiot");
      return {
        leagues,
        matches
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}