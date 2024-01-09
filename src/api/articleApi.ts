import type { ArticleType } from "~/types/article";
import type { ResponseData } from "~/types/common";

interface selectArticleDataType {
  page?: number;
  offset?: number;
  keyword?: string;
  field?: string;
}

const API_PREFIX = "/article";

export const updateArticle = <T>(
  id: string,
  data: { article_watch: number }
) => {
  return useRequest({
    url: API_PREFIX + "/update/" + id,
    data,
    method: "PATCH",
  });
};

/**
 * 获取时间线
 * @returns
 */
export const getArticleTimeline = <T>() => {
  return useRequest<T>({
    url: API_PREFIX + "/timeline",
    method: "GET",
  });
};

type SelectArticle = {
  rows: Array<ArticleType>;
  count: number;
};

/**
 * 查询文章
 * @param data
 * @returns
 */
export const selectArticle = (
  data: selectArticleDataType = { page: 1, offset: 5 },
  lazy: boolean = true
) => {
  const params: selectArticleDataType = {};

  for (const key in data) {
    if (data[key]) {
      params[key] = data[key];
    }
  }

  return useRequest<SelectArticle>(
    {
      url: API_PREFIX + "s",
      method: "GET",
      params: params,
    },
    lazy
  );
};

/**
 * 获取文章详情
 * @param id
 * @returns
 */
export const getArticleDetail = (id: string) => {
  return useRequest<ResponseData<ArticleType>>({
    url: API_PREFIX + "/" + id,
    method: "GET",
  });
};

type AddArticle = {
  author_id: number;
  title: string;
  type: string;
  description: string;
  pic: string;
  content: string;
  tags: string[];
};

/**
 * 添加文章
 * @param data
 * @returns
 */
export const addArticle = (data: AddArticle) => {
  return useRequest({
    url: API_PREFIX,
    method: "POST",
    data,
  });
};
