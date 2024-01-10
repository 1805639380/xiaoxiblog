import { TagType } from './tag.d';
import { User } from "./user";

export interface ArticleData {
  rows: Array<ArticleType>;
  count: number;
}

export interface ArticleType {
  id: number;
  author: User;
  comment_num: number;
  content: string;
  createTime: string;
  deleteAt: string;
  description: string;
  pic: string;
  publish_date: string;
  title: string;
  type: string;
  updatedTime: string;
  watch_num: number;
  tags: string[];
  tagsEntity: TagType[];
}
