import { League } from "./league";
import { Match } from "./match";

export interface SummonerData {
    leagues: League[],
    matches: Match[]
}