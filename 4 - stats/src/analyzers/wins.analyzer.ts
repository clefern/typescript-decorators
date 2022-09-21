import { MatchResult } from '../enums/match-result.enum';
import { Match } from '../model/Match';
import { Analyzer } from '../summary';

export class WinsAnalyser implements Analyzer {
  constructor(public teamName: string) {}

  run(matches: Match[]): string {
    let wins = 0;

    for (let match of matches) {
      if (
        match.homeTeam === this.teamName &&
        match.winner === MatchResult.HomeWin
      ) {
        wins++;
      } else if (
        match.awayTeam === this.teamName &&
        match.winner === MatchResult.AwayWin
      ) {
        wins++;
      }
    }
    return `${this.teamName} won ${wins} game${'s'.repeat(wins > 1 ? 1 : 0)}`;
  }
}
