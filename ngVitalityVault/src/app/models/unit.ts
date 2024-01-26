import { LogEntry } from "./log-entry";

export class Unit {
  id:number;
  name: string;
  logEntry: LogEntry[];

  constructor(
    id:number=0,
    name: string = '',
    logEntry: LogEntry[] = []

  ) {
    this.id=id;
    this.name = name;
    this.logEntry=logEntry
  }
}

