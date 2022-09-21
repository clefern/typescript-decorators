import { Match } from '../model/Match';
import { Analyzer } from '../summary';

export class AverageGoalsAnalyzer implements Analyzer {
  constructor(public team: string) {}

  run(matches: Match[]): string {
    const teamMatches = matches.filter(
      (match) => match.homeTeam === this.team || match.awayTeam === this.team
    );

    const totalGoals = teamMatches.reduce((total, match) => {
      if (match.homeTeam === this.team) {
        return total + match.homeScore;
      } else {
        return total + match.awayScore;
      }
    }, 0);

    return `${this.team} scored ${totalGoals} goals in ${teamMatches.length} games`;
  }
}
