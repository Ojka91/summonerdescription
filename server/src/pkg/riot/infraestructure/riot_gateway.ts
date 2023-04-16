
import RiotGatewayInterface from '../application/riot_gateway'
import { Match } from '../domain/match'
import { Matches } from '../domain/matches'
import { Summoner } from '../domain/summoner'
import axios, { AxiosInstance } from 'axios'


export class RiotGateway implements RiotGatewayInterface {
  constructor (
    private readonly httpClient: AxiosInstance,
    private readonly riotEndpoint: string,
    private readonly riotApiKey: string,
    private readonly logger: Logger
  ) {}

  public async getSummonerByName (summonerName: string): Promise<Summoner> {
   
  }

  public async getMatchesByPuuid (summonerPuuid: string): Promise<Matches> {
   
  }

  public async getMatchById (matchId: string): Promise<Match> {
   
  }
}
