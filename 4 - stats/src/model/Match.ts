import { MatchResult } from '../enums/match-result.enum';

export interface Match {
  date: Date;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: MatchResult;
  referee: string;
}
