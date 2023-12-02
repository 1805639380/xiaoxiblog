import type { ResponseData, ResponseType } from "~/types/common";

/**
 * 上传图片
 * @param data 文件数据
 * @returns 请求结果
 */
export const uploadImage = (data: FormData) => {
  return useRequest<ResponseData<string>>({
    url: "/image",
    method: "post",
    data,
  });
};
