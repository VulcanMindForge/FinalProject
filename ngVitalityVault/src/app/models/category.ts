export class Category {
  id:number;
  name: string;
  description: string;


  constructor(
    id:number=0,
    name: string = '',
    description: string = '',

  ) {
    this.id = id;
    this.description = description;
    this.name = name;
  }
}
