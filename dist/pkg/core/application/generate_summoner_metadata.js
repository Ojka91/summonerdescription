"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates payload with summoner key data.
 * This data will be used by chat gpt to process our prompt
 */
class GenerateSummonerMetadata {
    constructor() { }
    getForDescription(summonerData, summonerName) {
        try {
            const rank = this.getRankSoloQueue(summonerData.leagues);
            const isInHotStreak = this.isInHotStreak(summonerData.leagues);
            let gamesInfo = [];
            for (const match of summonerData.matches) {
                const gameMode = this.getGameMode(match);
                gamesInfo.push(`Player played ${gameMode} game type. ${this.getPlayerInfoOfTheGame(match, summonerName)}`);
            }
            return JSON.stringify({
                playerRank: rank,
                name: summonerName,
                isInHotStreak,
                gamesInfo
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    getRankSoloQueue(leagues) {
        for (const league of leagues) {
            if (league.queueType === 'RANKED_SOLO_5x5') {
                return `Player is rank ${league.tier} ${league.rank} with ${league.wins} wins and ${league.losses} losses`;
            }
        }
        return 'Unranked';
    }
    isInHotStreak(leagues) {
        for (const league of leagues) {
            if (league.queueType = 'RANKED_SOLO_5x5') {
                return league.hotStreak;
            }
        }
        return false;
    }
    getGameMode(match) {
        return match.info.gameMode;
    }
    getPlayerInfoOfTheGame(match, summonerName) {
        let playerGameDetails;
        for (const participant of match.info.participants) {
            if (participant.summonerName === summonerName) {
                return playerGameDetails = `Player ${participant.win === true ? 'won' : 'lost'} the game with ${participant.kills}/${participant.deaths}/${participant.assists} playing ${participant.championName} ${participant.teamPosition}`;
            }
        }
        return 'Oops player didnt played this game';
    }
}
exports.default = GenerateSummonerMetadata;
//# sourceMappingURL=generate_summoner_metadata.js.map