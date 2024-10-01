import type { ArticleTypeType } from "~/types/article";
import type { PageParams, ResponseData } from "~/types/common";

const API_PREFIX = "/article";

export interface GetArticleTypesParams extends PageParams {
  field?: 'id';
}

export const getArticleTypes = (getArticleTypesParams: GetArticleTypesParams) => {
  return useRequest<ResponseData<ArticleTypeType>>({
    url: API_PREFIX + "/types",
    method: "GET",
    params: getArticleTypesParams
  });
};