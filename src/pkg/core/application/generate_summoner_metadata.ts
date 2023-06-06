import { League } from "@/pkg/riot/domain/league";
import { Match } from "@/pkg/riot/domain/match";
import { SummonerData } from "@/pkg/riot/domain/summoner_data";


/**
 * Creates payload with summoner key data.
 * This data will be used by chat gpt to process our prompt
 */
export default class GenerateSummonerMetadata {
    constructor(){}

  public getForDescription (summonerData: SummonerData, summonerName: string): string {
    try {
        const rank = this.getRankSoloQueue(summonerData.leagues)
        const isInHotStreak = this.isInHotStreak(summonerData.leagues)
        const gamesInfo = this.getGamesInfo(summonerData, summonerName)
      return JSON.stringify({
        playerRank: rank,
        name: summonerName,
        isInHotStreak,
        gamesInfo
      })

    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  private getGamesInfo(summonerData: SummonerData, summonerName: string) {
    let gamesInfo: string[] = []
    for (const match of summonerData.matches) {
        const gameMode = this.getGameMode(match)
        gamesInfo.push(`Player played ${gameMode} game type. ${this.getPlayerInfoOfTheGame(match, summonerName)}`)
    }
  }

  private getRankSoloQueue (leagues: League[]): string {
    for (const league of leagues) {
        if (league.queueType === 'RANKED_SOLO_5x5') {
            return `Player is rank ${league.tier} ${league.rank} with ${league.wins} wins and ${league.losses} losses`
        }
    }
    return 'Unranked'
  }

  private isInHotStreak (leagues: League[]): boolean {
    for (const league of leagues) {
        if (league.queueType = 'RANKED_SOLO_5x5') {
            return league.hotStreak
        }
    }
    return false
  }

  private getGameMode (match: Match): string {
    return match.info.gameMode
  }

  private getPlayerInfoOfTheGame (match: Match, summonerName: string): string {
    for (const participant of match.info.participants) {
        if (participant.summonerName === summonerName) {
            return `Player ${participant.win === true ? 'won' : 'lost'} the game with ${participant.kills}/${participant.deaths}/${participant.assists} playing ${participant.championName} ${participant.teamPosition}`
         } 
    }
    return 'Oops player didnt played this game'
  }
}