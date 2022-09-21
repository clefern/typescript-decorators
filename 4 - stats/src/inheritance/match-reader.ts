import { CsvFileReader } from './csv-file-reader';
import { MatchResult } from '../enums/match-result.enum';
import { Match } from '../model/Match';
import { dateStringToDate } from '../utils/utils';

export class MatchReader extends CsvFileReader<Match> {
  mapRow(row: string[]): Match {
    const [date, homeTeam, awayTeam, homeScore, awayScore, winner, referee] =
      row;
    return {
      date: dateStringToDate(date),
      homeTeam,
      awayTeam,
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      winner: winner as MatchResult,
      referee,
    };
  }
}
