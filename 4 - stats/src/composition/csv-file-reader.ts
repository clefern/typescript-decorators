import fs from 'fs';

export interface DataReader {
  data: string[][];
  read(): void;
}

export class CsvFileReader implements DataReader {
  data: string[][] = [];

  constructor(public filename: string) {}

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
      });
  }
}
