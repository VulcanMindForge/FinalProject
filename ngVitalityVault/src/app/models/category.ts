import { LogEntryType } from "./log-entry-type";

export class Category {
  id:number;
  name: string;
  description: string;
  logEntryType: LogEntryType[];

  constructor(
    id:number=0,
    name: string = '',
    description: string = '',
    logEntryType: LogEntryType[] = []

  ) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.logEntryType= logEntryType;
  }
}
