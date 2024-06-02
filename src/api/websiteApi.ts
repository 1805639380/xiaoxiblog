import type { PageParams, ResponseData } from "~/types/common";
import type { WebsiteSetting } from "~/types/websiteSetting";

export type GetWebsiteSettingParams = PageParams & {};

/**
 * 获取网站配置
 */
export const getWebsiteSetting = (params?: GetWebsiteSettingParams) => {
  return useRequest<ResponseData<WebsiteSetting>>({
    url: "/website/setting",
    method: "GET",
    params,
  });
};
