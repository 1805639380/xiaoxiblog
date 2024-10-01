import { TagType } from './tag.d';
import { User } from "./user";
import { CommonEntity } from "./common";

export interface ArticleData {
  rows: Array<ArticleType>;
  count: number;
}

export interface ArticleTypeType extends CommonEntity {
  name: string;
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
  type: ArticleTypeType;
  updatedTime: string;
  watch_num: number;
  tags: string[];
  tagsEntity: TagType[];
}
