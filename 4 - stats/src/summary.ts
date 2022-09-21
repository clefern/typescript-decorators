import { WinsAnalyser } from './analyzers/wins.analyzer';
import { Match } from './model/Match';
import { ConsoleReport } from './reports/console.report';
import { HtmlReport } from './reports/html.report';

export interface Analyzer {
  run(matches: Match[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  static winsAnalysisWithHtmlReport(team: string): Summary {
    return new Summary(new WinsAnalyser(team), new HtmlReport());
  }

  static createInstanceWithGenericClassDependencies<
    A extends Analyzer,
    O extends OutputTarget
  >(
    team: string,
    analyzer: { new (teamName: string): A },
    output: { new (): O }
  ): Summary {
    return new Summary(new analyzer(team), new output());
  }

  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: Match[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }

  // create<S extends Database, T extends { new: () => S, newInstance: () => S }>(classType: T): S {
  //   return classType.newInstance();
}
