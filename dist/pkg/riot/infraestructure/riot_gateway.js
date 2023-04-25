"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiotGateway = void 0;
const logger_1 = require("../../../utils/logger");
/**
 * RiotGateway.
 * This class contains the necessary methods to call riot api
 */
class RiotGateway {
    constructor(httpClient, riotEndpoint, riotApiKey) {
        this.httpClient = httpClient;
        this.riotEndpoint = riotEndpoint;
        this.riotApiKey = riotApiKey;
        this.count = 15;
    }
    async getSummonerByName(summonerName, region) {
        try {
            const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.riotApiKey}`);
            return response.data;
        }
        catch (error) {
            if (error?.response?.status === 404)
                throw new Error(error?.response?.data?.status?.message);
            logger_1.logger.error(error, "getSummonerByName error");
            throw new Error("Oops... Unexpected error ocurred :( Please try again later or raise the issue");
        }
    }
    async getMatchesByPuuid(summonerPuuid, region) {
        try {
            const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=${this.count}&api_key=${this.riotApiKey}`);
            return response.data;
        }
        catch (error) {
            if (error?.response?.status === 404)
                throw new Error(error?.response?.data?.status?.message);
            logger_1.logger.error(error, "getMatchesByPuuid error");
            throw new Error("Oops... Unexpected error ocurred :( Please try again later or raise the issue");
        }
    }
    async getMatchById(matchId, region) {
        try {
            const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/match/v5/matches/${matchId}?api_key=${this.riotApiKey}`);
            return response.data;
        }
        catch (error) {
            if (error?.response?.status === 404)
                throw new Error(error?.response?.data?.status?.message);
            logger_1.logger.error(error, "getMatchById error");
            throw new Error("Oops... Unexpected error ocurred :( Please try again later or raise the issue");
        }
    }
    async getSummonerLeague(summonerId, region) {
        try {
            const response = await this.httpClient.get(`https://${region}.${this.riotEndpoint}/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.riotApiKey}`);
            return response.data;
        }
        catch (error) {
            if (error?.response?.status === 404)
                throw new Error(error?.response?.data?.status?.message);
            logger_1.logger.error(error, "getSummonerLeague error");
            throw new Error("Oops... Unexpected error ocurred :( Please try again later or raise the issue");
        }
    }
}
exports.RiotGateway = RiotGateway;
//# sourceMappingURL=riot_gateway.js.map