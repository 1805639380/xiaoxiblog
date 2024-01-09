import type { ArticleType } from "./article";
import type { CommonEntity } from "./common";

export interface TagType extends CommonEntity {
  tagName: string;
  byNum: number;
  byArticle: ArticleType[];
}
