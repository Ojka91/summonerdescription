"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenerateSummonerMetadatadHandler = void 0;
const generate_summoner_metadata_1 = __importDefault(require("../application/generate_summoner_metadata"));
const createGenerateSummonerMetadatadHandler = () => {
    return new generate_summoner_metadata_1.default();
};
exports.createGenerateSummonerMetadatadHandler = createGenerateSummonerMetadatadHandler;
//# sourceMappingURL=generate_summoner_payload_init.js.map