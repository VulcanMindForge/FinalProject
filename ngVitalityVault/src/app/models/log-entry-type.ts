import { Category } from "./category";

export class LogEntryType {
  id:number;
  name: string;
  description: string;
  imageUrl: string;
  category: Category|null;



  constructor(
    id:number=0,
    name: string = '',
    description: string = '',
    imageUrl: string = '',
    category: Category|null = null,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
  }
}
