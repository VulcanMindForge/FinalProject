import { User } from "./user";

export class Trial {
  id:number;
  createDate: string;
  purpose: string;
  lastUpdate: string;
  startDate: string;
  endDate: string;
  title: string;
  published: string;
  user: User|null;


  constructor(
    id:number=0,
    createDate: string = '',
    purpose: string = '',
    lastUpdate: string = '',
    startDate: string = '',
    endDate: string = '',
    title: string = '',
    published: string = '',
    user: User|null=null
  ) {
    this.id = id;
    this.createDate = createDate;
    this.purpose = purpose;
    this.lastUpdate = lastUpdate;
    this.startDate = startDate;
    this.endDate = endDate;
    this.title = title;
    this.published = published;
    this.user=user;
  }
}
