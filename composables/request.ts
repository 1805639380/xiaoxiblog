import { ElMessage } from "element-plus";

interface RequestType {
  url: string;
  data?: object | string;
  params?: any;
  method?: string;
  headers?: any;
}

// 封装 请求 工具
export const useRequest = <T>(options: RequestType, lazy: boolean = false) => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.requestBaseUrl;

  if (!options.headers) {
    options.headers = {};
  }

  const cookieToken = useCookie("token");

  if (cookieToken && cookieToken.value) {
    const TOKEN_TYPE: string = "Bearer";
    options.headers["authorization"] = TOKEN_TYPE + " " + cookieToken.value;
  }

  return useFetch<T>(`${baseURL}${options.url}`, {
    body: options.data,
    params: options.params,
    method: options.method || "GET",
    headers: options.headers,
    lazy,
    onResponseError({ request, response, options }) {
      // 处理响应错误
      ElMessage({
        message: response._data.message,
        type: "error",
      });
    },
  });
};

export const useReqTs = <T>(options: RequestType, lazy: boolean = false) => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.requestBaseUrl;

  if (!options.headers) {
    options.headers = {};
  }

  const cookieToken = useCookie("token");

  if (cookieToken && cookieToken.value) {
    const TOKEN_TYPE: string = "Bearer";
    options.headers["authorization"] = TOKEN_TYPE + " " + cookieToken.value;
  }

  return useFetch<T>(`${baseURL}${options.url}`, {
    body: options.data,
    params: options.params,
    method: options.method,
    headers: options.headers,
    lazy,
  });
};
