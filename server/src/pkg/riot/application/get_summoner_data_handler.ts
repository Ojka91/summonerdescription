import { League } from "../domain/league";
import { Match } from "../domain/match";
import { regionRouter } from "../domain/region_router";
import { Summoner } from "../domain/summoner";
import { SummonerData } from "../domain/summoner_data";
import RiotGatewayInterface from "./riot_gateway";

/**
 * Handler to retreive needed summoner data
 */
export default class GetSummonerDataHandler {

constructor (
    public riotGateway: RiotGatewayInterface
  ) {}

  public async handle (region: string, summonerName: string): Promise<SummonerData> {
    console.time("fetchingRiot");
    try {
      
      // Get summoner data by name and region
      const summoner: Summoner = await this.riotGateway.getSummonerByName(summonerName, region)
      // Get summoner league and rank based on summoner id
      const leagues: League[] = await this.riotGateway.getSummonerLeague(summoner.id, region)
      
      // Get list of matches based on summoner puuid
      const matchesId: string[] = await this.riotGateway.getMatchesByPuuid(summoner.puuid, regionRouter[region])
      
      // Get detailed info for every match (there is no cleaner way to do it with current status of riot api :( )
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