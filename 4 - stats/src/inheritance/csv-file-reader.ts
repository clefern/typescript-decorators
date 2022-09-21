import fs from 'fs';
import { Match } from '../model/Match';
import { MatchResult } from '../enums/match-result.enum';
import { dateStringToDate } from '../utils/utils';

export abstract class CsvFileReader<T> {
  data!: T[];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      })
      .filter((row: string[]): boolean => {
        return row.length === 7;
      })
      .map((row: string[]): T => {
        return this.mapRow(row);
      });
  }
}
