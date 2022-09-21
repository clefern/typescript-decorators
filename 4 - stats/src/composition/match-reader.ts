import { DataReader } from './csv-file-reader';
import { MatchResult } from '../enums/match-result.enum';
import { Match } from '../model/Match';
import { dateStringToDate } from '../utils/utils';

export class MatchReader {
  static createAndLoad(reader: DataReader): MatchReader {
    const matchReader = new MatchReader(reader).load();
    return matchReader;
  }

  matches: Match[] = [];

  constructor(public reader: DataReader) {}

  load(): MatchReader {
    this.reader.read();
    this.matches = this.reader.data.map((match: string[]): Match => {
      const [date, homeTeam, awayTeam, homeScore, awayScore, winner, referee] =
        match;
      return {
        date: dateStringToDate(date),
        homeTeam,
        awayTeam,
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        winner: winner as MatchResult,
        referee,
      };
    });
    return this;
  }
}
