import { Match } from "../domain/match";
import { Summoner } from "../domain/summoner";

export default interface RiotGatewayInterface {
  getSummonerByName: (summonerName: string, region: string) => Promise<Summoner>
  getMatchesByPuuid: (puuid: string, region: string) => Promise<string[]>
  getMatchById: (matchId: string, region: string) => Promise<Match>

}
