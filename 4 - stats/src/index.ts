import { AverageGoalsAnalyzer } from './analyzers/average-goals.analyzer';
import { WinsAnalyser } from './analyzers/wins.analyzer';
import { CsvFileReader } from './composition/csv-file-reader';
import { MatchReader } from './composition/match-reader';
import { ConsoleReport } from './reports/console.report';
import { HtmlReport } from './reports/html.report';
import { Summary } from './summary';

const reader = MatchReader.createAndLoad(
  new CsvFileReader('data/football.csv')
);

const summary = Summary.createInstanceWithGenericClassDependencies(
  'Man United',
  AverageGoalsAnalyzer,
  ConsoleReport
);

summary.buildAndPrintReport(reader.matches);
