
import RiotGatewayInterface from '../application/riot_gateway'
import { Match } from '../domain/match'
import { Summoner } from '../domain/summoner'
import { AxiosInstance } from 'axios'


export class RiotGateway implements RiotGatewayInterface {

  private count = 20

  constructor (
    private readonly httpClient: AxiosInstance,
    private readonly riotEndpoint: string,
    private readonly riotApiKey: string,
  ) {}

  public async getSummonerByName (summonerName: string, region: string): Promise<Summoner> {
    try {
      const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.riotApiKey}`)

      return response.data
    } catch (error) {
      throw new Error((error as Error).message)
    }
   
  }

  public async getMatchesByPuuid (summonerPuuid: string, region: string): Promise<string[]> {
    try {
      const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=${this.count}&api_key=${this.riotApiKey}`)

      return response.data
    } catch (error) {
      throw new Error((error as Error).message)
    }
   
  }

  public async getMatchById (matchId: string, region: string): Promise<Match> {
    try {
      const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/match/v5/matches/${matchId}?api_key=${this.riotApiKey}`)

      return response.data
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
