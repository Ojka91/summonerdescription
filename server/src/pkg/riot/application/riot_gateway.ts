import { Match } from "../domain/match";
import { Matches } from "../domain/matches";
import { Summoner } from "../domain/summoner";

export default interface RiotGatewayInterface {
  getSummonerByName: (summonerName: string) => Promise<Summoner>
  getMatchesByPuuid: (puuid: string) => Promise<Matches>
  getMatchById: (matchId: string) => Promise<Match>

}
