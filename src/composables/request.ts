interface RequestType {
  url: string;
  data?: object | string;
  params?: any;
  method?: string;
  headers?: any;
}

interface ResponseType<T> {
  code: number;
  data: T;
  path: string;
  timestamp: string;
  message: string;
}

// 封装 请求 工具
export const useRequest = <T>(options: RequestType, lazy: boolean = false) => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.requestBaseUrl;

  const { url } = options;
  let requestUrl = url;
  if (!url.startsWith("http")) {
    requestUrl = `${baseURL}${url}`;
  }

  if (!options.headers) {
    options.headers = {};
  }

  const cookieToken = useCookie("token");
  if (cookieToken && cookieToken.value) {
    const TOKEN_TYPE: string = "Bearer";
    options.headers["authorization"] = TOKEN_TYPE + " " + cookieToken.value;
  }

  options.headers["cookie"] = useRequestHeaders(["cookie"]);

  return useFetch<ResponseType<T>>(requestUrl, {
    body: options.data,
    credentials: "include",
    params: options.params,
    method: options.method as any,
    headers: options.headers,
    lazy,
    onRequestError({ request, options, error }) {
      // 处理请求错误
      useMessage({
        message: error.message,
        type: "error",
      });
    },
    onResponseError({ request, response, options }) {
      // 处理响应错误
      useMessage({
        message: response._data.message,
        type: "error",
      });
    },
  });
};
