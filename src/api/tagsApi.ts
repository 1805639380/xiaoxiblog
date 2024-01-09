import type { ResponseData } from "~/types/common";
import type { TagType } from "~/types/tag";

type getTagsParam = {
  page?: number;
  offset?: number;
  sorted?: "DESC" | "ASC";
};
/**
 * 获取标签
 * @returns
 */
export const getTags = (data?: getTagsParam, lazy: boolean = true) => {
  return useRequest<ResponseData<TagType>>({
    url: "/tags",
    method: "GET",
    params: data,
  }, lazy);
};
