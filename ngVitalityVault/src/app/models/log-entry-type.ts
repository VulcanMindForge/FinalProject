import { Category } from "./category";
import { LogEntry } from "./log-entry";
import { Trial } from "./trial";

export class LogEntryType {
  id:number;
  name: string;
  description: string;
  category: Category|null;
  trial: Trial[];
  logEntry: LogEntry[];

  constructor(
    id:number=0,
    name: string = '',
    description: string = '',
    category: Category|null = null,
    trial: Trial[] = [],
    logEntry: LogEntry[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.trial= trial;
    this.logEntry=logEntry;
  }
}

export { LogEntry, Trial };
