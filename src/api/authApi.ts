import type { ResponseData } from "~/types/common";

const API_PREFIX = "/auth";

type LoginResType = {
  access_token: string;
  refresh_token: string;
};
export const login = (data: { username: string; password: string }) => {
  return useRequest<LoginResType>({
    url: API_PREFIX + "/login",
    method: "POST",
    data,
  });
};

export const refresh = (data: { refresh_token: string }) => {
  return useRequest<LoginResType>({
    url: API_PREFIX + "/refresh",
    method: "GET",
    params: data,
  });
};
