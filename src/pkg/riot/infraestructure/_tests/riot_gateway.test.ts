import axios from 'axios'
import { RiotGateway } from '../riot_gateway'
import { Summoner } from '../../domain/summoner'

/**
 * Auto generated tests testing IA
 */
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('RiotGateway', () => {
  const riotGateway = new RiotGateway(axios, 'localhost', '1234')

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getSummonerByName', () => {
    const region = 'NA'
    const summonerName = 'testSummoner'

    it('should return a Summoner object on successful API call', async () => {
      const expectedSummoner: Summoner = { name: 'testSummoner', id: '', accountId:'', profileIconId: 2, puuid: '', revisionDate: 2, summonerLevel:2 }
      mockedAxios.get.mockResolvedValue({ data: expectedSummoner })

      const summoner = await riotGateway.getSummonerByName(summonerName, region)

      expect(summoner).toEqual(expectedSummoner)
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://${region}.localhost/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=1234`)
    })

    it('should throw an error if the API call returns 404', async () => {
      const riotError = { status: { message: 'Summoner not found' } }
      const axiosError = { response: { status: 404, data: riotError } }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getSummonerByName(summonerName, region)).rejects.toThrowError('Summoner not found')
    })

    it('should throw a generic error if the API call fails for other reasons', async () => {
      const axiosError = { message: 'network error' }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getSummonerByName(summonerName, region)).rejects.toThrowError('Oops... Unexpected error ocurred :( Please try again later or raise the issue')
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://${region}.localhost/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=1234`)
    })
  })

  describe('getMatchesByPuuid', () => {
    const region = 'NA'
    const summonerPuuid = 'testSummoner'
    const count = 20

    it('should return a Summoner object on successful API call', async () => {
      const expectedSummoner: Summoner = { name: 'testSummoner', id: '', accountId:'', profileIconId: 2, puuid: '', revisionDate: 2, summonerLevel:2 }
      mockedAxios.get.mockResolvedValue({ data: expectedSummoner })

      const summoner = await riotGateway.getMatchesByPuuid(summonerPuuid, region)

      expect(summoner).toEqual(expectedSummoner)
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://${region}.localhost/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=${count}&api_key=1234`)
    })

    it('should throw an error if the API call returns 404', async () => {
      const riotError = { status: { message: 'Summoner not found' } }
      const axiosError = { response: { status: 404, data: riotError } }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getMatchesByPuuid(summonerPuuid, region)).rejects.toThrowError('Summoner not found')
    })

    it('should throw a generic error if the API call fails for other reasons', async () => {
      const axiosError = { message: 'network error' }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getMatchesByPuuid(summonerPuuid, region)).rejects.toThrowError('Oops... Unexpected error ocurred :( Please try again later or raise the issue')
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://${region}.localhost/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=${count}&api_key=1234`)
    })
  })

  describe('getMatchByid', () => {
    const region = 'NA'
    const summonerPuuid = 'testSummoner'
    const count = 20

    it('should return a Summoner object on successful API call', async () => {
      const expectedSummoner: Summoner = { name: 'testSummoner', id: '', accountId:'', profileIconId: 2, puuid: '', revisionDate: 2, summonerLevel:2 }
      mockedAxios.get.mockResolvedValue({ data: expectedSummoner })

      const summoner = await riotGateway.getMatchById(summonerPuuid, region)

      expect(summoner).toEqual(expectedSummoner)
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://NA.localhost/lol/match/v5/matches/testSummoner?api_key=1234`)
    })

    it('should throw an error if the API call returns 404', async () => {
      const riotError = { status: { message: 'Summoner not found' } }
      const axiosError = { response: { status: 404, data: riotError } }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getMatchById(summonerPuuid, region)).rejects.toThrowError('Summoner not found')
    })

    it('should throw a generic error if the API call fails for other reasons', async () => {
      const axiosError = { message: 'network error' }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getMatchById(summonerPuuid, region)).rejects.toThrowError('Oops... Unexpected error ocurred :( Please try again later or raise the issue')
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://NA.localhost/lol/match/v5/matches/testSummoner?api_key=1234`)
    })
  })

  describe('getSummonerLeague', () => {
    const region = 'NA'
    const summonerPuuid = 'testSummoner'
    const count = 20

    it('should return a Summoner object on successful API call', async () => {
      const expectedSummoner: Summoner = { name: 'testSummoner', id: '', accountId:'', profileIconId: 2, puuid: '', revisionDate: 2, summonerLevel:2 }
      mockedAxios.get.mockResolvedValue({ data: expectedSummoner })

      const summoner = await riotGateway.getSummonerLeague(summonerPuuid, region)

      expect(summoner).toEqual(expectedSummoner)
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://NA.localhost/lol/league/v4/entries/by-summoner/testSummoner?api_key=1234`)
    })

    it('should throw an error if the API call returns 404', async () => {
      const riotError = { status: { message: 'Summoner not found' } }
      const axiosError = { response: { status: 404, data: riotError } }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getSummonerLeague(summonerPuuid, region)).rejects.toThrowError('Summoner not found')
    })

    it('should throw a generic error if the API call fails for other reasons', async () => {
      const axiosError = { message: 'network error' }
      mockedAxios.get.mockRejectedValue(axiosError)

      await expect(riotGateway.getSummonerLeague(summonerPuuid, region)).rejects.toThrowError('Oops... Unexpected error ocurred :( Please try again later or raise the issue')
      expect(mockedAxios.get).toHaveBeenCalledWith(`https://NA.localhost/lol/league/v4/entries/by-summoner/testSummoner?api_key=1234`)
    })
  })
})