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

/**
 * 验证邮箱验证码
 * @param data
 * @returns
 */
export const checkEmailCode = (data: { checkCode: string; email: string }) => {
  return useRequest<ResponseData<any>>({
    url: `/email/check`,
    method: "POST",
    data,
  });
};
