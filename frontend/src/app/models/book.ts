import {Type} from "./type";
import {Author} from "./author";

export interface Book {
  _id: string;
  title: string;
  type: Type;
  author: Author;
  published_at: Date;
}
