import { LogEntry } from './log-entry';
import { LogEntryTypeComment } from './log-entry-type-comment';
import { Trial } from './trial';
export class User {
  // email: string;
  id:number;
  username: string;
  password: string;
  enabled: boolean;
  role: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  sex: string;
  biography: string;
  imageUrl: string;
  email: string;
  logEntry: LogEntry[];
  logEntryTypeComment: LogEntryTypeComment[];
  trial: Trial[];

  constructor(
    // email: string = '',
    id:number=0,
    username: string = '',
    password: string = '',
    enabled: boolean = false,
    role: string = '',
    firstName: string = '',
    lastName: string = '',
    birthdate: string = '',
    sex: string = '',
    biography: string = '',
    imageUrl: string = '',
    email: string = '',
    logEntry: LogEntry[] = [],
    logEntryTypeComment: LogEntryTypeComment[] = [],
    trial: Trial[] = []
  ) {
    // this.email = email;
    this.id = id;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.sex = sex;
    this.biography = biography;
    this.imageUrl = imageUrl;
    this.email = email;
    this.logEntry=logEntry;
    this.logEntryTypeComment=logEntryTypeComment;
    this.trial=trial;
  }
}
