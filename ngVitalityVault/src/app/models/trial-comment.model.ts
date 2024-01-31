import { Trial } from "./trial";
import { User } from "./user";

export class TrialComment {
  id:number;
  content: string;
  contentDate: string;
  user: User|null;
  trials: Trial[];


  constructor(
    id:number=0,
    content: string = '',
    contentDate: string = '',
    user: User|null=null,
    trials: Trial[] = [],
  ) {
    this.id = id;
    this.content = content;
    this.contentDate = contentDate;
    this.user=user;
    this.trials=trials;
  }
}
