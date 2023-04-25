"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetSummonerDataHandler = void 0;
const get_summoner_data_handler_1 = __importDefault(require("../application/get_summoner_data_handler"));
const riot_gateway_1 = require("../infraestructure/riot_gateway");
const axios_1 = __importDefault(require("axios"));
const createGetSummonerDataHandler = () => {
    const riotEndpoint = process.env.RIOT_ENDPOINT ?? '';
    const riotApiKey = process.env.RIOT_API_KEY ?? '';
    return new get_summoner_data_handler_1.default(new riot_gateway_1.RiotGateway(axios_1.default, riotEndpoint, riotApiKey));
};
exports.createGetSummonerDataHandler = createGetSummonerDataHandler;
//# sourceMappingURL=get_summoner_data_init.js.map