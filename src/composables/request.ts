import type { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { isEmpty } from "undraw-ui";
import { refresh } from "~/api/authApi";
import type { ResponseType } from "~/types/common";

interface RequestType {
  url: string;
  data?: object | string;
  params?: any;
  method?: string;
  headers?: any;
}
let isFreshToken = false;
let requests = [];
// 封装 请求 工具
export const useRequest = <T>(options: RequestType, lazy: boolean = true) => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.requestBaseUrl;
  const router = useRouter();

  const { url } = options;
  let requestUrl = url;
  if (!url.startsWith("http")) {
    requestUrl = `${baseURL}${url}`;
  }

  const fetchRequest = async (
    token?: string
  ): Promise<
    // @ts-ignore
    _AsyncData<ResponseType<T>, FetchError<any>>
  > => {
    if (!options.headers) {
      options.headers = {};
    }
    const TOKEN_TYPE: string = "Bearer";
    if (token) {
      options.headers["authorization"] = TOKEN_TYPE + " " + token;
    }
    const cookieToken = useCookie("token");
    if (cookieToken && !isEmpty(cookieToken.value)) {
      options.headers["authorization"] = TOKEN_TYPE + " " + cookieToken.value;
    }

    options.headers["cookie"] = useRequestHeaders(["cookie"]);
    // @ts-ignore
    let response: _AsyncData<ResponseType<T>, FetchError<any>>;
    try {
      const response = await useFetch<ResponseType<T>>(requestUrl, {
        body: options.data,
        credentials: "include",
        params: options.params,
        method: options.method as any,
        headers: options.headers,
        lazy,
      });
      const { error } = response;
      if (error.value) {
        throw error.value;
      }
      return response;
    } catch (error) {
      if (error.statusCode === 401) {
        if (!isFreshToken) {
          try {
            const refreshToken = useCookie("refreshToken");
            // refreshToken为空，重新登录
            if (isEmpty(refreshToken.value)) {
              return response;
            }

            const { data, error } = await refresh({
              refresh_token: refreshToken.value,
            });
            // 刷新token出错，重新登录
            if (error.value) {
              return response;
            }

            setToken(
              data.value?.data.access_token,
              data.value?.data.refresh_token
            );
            isFreshToken = true;

            requests.forEach((cb) => cb(data.value?.data.access_token));
            isFreshToken = false;
            requests = [];

            return fetchRequest(data.value?.data.access_token); // 重新发送当前请求
          } catch (refreshError) {
            return response;
          }
        } else {
          // 将当前请求挂起，等待重复请求
          return new Promise((resolve) => {
            requests.push((token) => resolve(fetchRequest(token)));
          });
        }
      } else {
        useMessage({
          type: "error",
          message: error.message,
        });
      }
    }
  };

  return fetchRequest();
};

// 封装 请求 工具
export const useRequest_old = <T>(
  options: RequestType,
  lazy: boolean = true
) => {
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
