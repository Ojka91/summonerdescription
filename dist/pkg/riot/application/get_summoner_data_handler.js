"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const region_router_1 = require("../domain/region_router");
/**
 * Handler to retreive needed summoner data
 */
class GetSummonerDataHandler {
    constructor(riotGateway) {
        this.riotGateway = riotGateway;
    }
    async handle(region, summonerName) {
        console.time("fetchingRiot");
        try {
            // Get summoner data by name and region
            const summoner = await this.riotGateway.getSummonerByName(summonerName, region);
            // Get summoner league and rank based on summoner id
            const leagues = await this.riotGateway.getSummonerLeague(summoner.id, region);
            // Get list of matches based on summoner puuid
            const matchesId = await this.riotGateway.getMatchesByPuuid(summoner.puuid, region_router_1.regionRouter[region]);
            // Get detailed info for every match (there is no cleaner way to do it with current status of riot api :( )
            let matches = await Promise.all(matchesId.map(match => this.riotGateway.getMatchById(match, region_router_1.regionRouter[region])));
            // for (const match of matchesId) {
            //   matches.push(await this.riotGateway.getMatchById(match, regionRouter[region]))
            // }
            console.timeEnd("fetchingRiot");
            return {
                leagues,
                matches
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = GetSummonerDataHandler;
//# sourceMappingURL=get_summoner_data_handler.js.map