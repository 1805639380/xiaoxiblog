export interface ArticleData {
  rows: Array<ArticleType>;
  count: number;
}

export interface ArticleType {
  id: number;
  author_id: string;
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
}
