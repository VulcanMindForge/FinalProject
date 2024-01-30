import { LogEntryType } from "./log-entry-type";
import { Unit } from "./unit";
import { User } from "./user";

export class LogEntry {
  id:number;
  logEntryType: LogEntryType;
  createDate: string;
  lastUpdate: string;
  entryDate: Date;
  description: string;
  degree: string;
  amount: string;
  entryTime: string;
  user: User;
  unit: Unit;


  constructor(
    id:number=0,
    createDate: string = '',
    entryTime: string = '',
    lastUpdate: string = '',
    entryDate: Date = new Date(),
    description: string = '',
    degree: string = '',
    amount: string = '',
    logEntryType: LogEntryType=new LogEntryType(),
    user: User = new User(),
    unit: Unit = new Unit(),
  ) {
    this.id = id;
    this.logEntryType=logEntryType;
    this.createDate = createDate;
    this.entryTime = entryTime;
    this.lastUpdate = lastUpdate;
    this.entryDate = entryDate;
    this.description = description;
    this.degree = degree;
    this.amount = amount;
    this.user=user;
    this.unit=unit;
  }
}
