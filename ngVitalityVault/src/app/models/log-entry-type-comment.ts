import { LogEntryType } from "./log-entry-type";
import { User } from "./user";

export class LogEntryTypeComment {
  id:number;
  content: string;
  contentDate: string;
  user: User|null;
  logEntryType: LogEntryType|null;


  constructor(
    id:number=0,
    content: string = '',
    contentDate: string = '',
    lastUpdate: string = '',
    user: User|null=null,
    logEntryType: LogEntryType|null=null,
  ) {
    this.id = id;
    this.content = content;
    this.contentDate = contentDate;
    this.user=user;
    this.logEntryType=logEntryType;
  }
}
