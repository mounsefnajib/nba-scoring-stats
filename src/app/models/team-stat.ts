import { Team } from "./team";
import { TeamScoring } from "./team-scoring";

export interface TeamStat {
    team:Team;
    stats: TeamScoring[];
    averages?: {
        avgScored: number,
        avgConceded: number
    }
}