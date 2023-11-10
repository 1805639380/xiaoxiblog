import { CommonEntity } from "./common";
import { User } from "./user";

export interface Comment extends CommonEntity {
  value: any;
  data: any;
  content: string;
  likes: User[];
  user: User;
  replys: Reply[];
}

export interface Reply extends CommonEntity {
  user_id: number;
  comment_id: number;
  content: string;
  likes: User[];
  user: User;
}
