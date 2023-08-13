
interface requestType {
  url: string,
  data?: object | string,
  params?: any,
  method?: string,
  headers?: any
}

// 封装 请求 工具
export const useRequest = <T>(options: requestType, lazy: boolean = false) => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.requestBaseUrl

  if (!options.headers) {
    options.headers = {}
  }

  const cookieToken = useCookie('token')

  if (cookieToken && cookieToken.value) {
    const TOKEN_TYPE: string = "Bearer"
    options.headers['authorization'] = TOKEN_TYPE + " " + cookieToken.value
  }

  return useFetch<any>(`${baseURL}${options.url}`, {
    body: options.data,
    params: options.params,
    method: options.method,
    headers: options.headers,
    lazy
  })
}


export const useReqTs = <T>(options: requestType, lazy: boolean = false) => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.requestBaseUrl

  if (!options.headers) {
    options.headers = {}
  }

  const cookieToken = useCookie('token')

  if (cookieToken && cookieToken.value) {
    const TOKEN_TYPE: string = "Bearer"
    options.headers['authorization'] = TOKEN_TYPE + " " + cookieToken.value
  }

  return useFetch<T>(`${baseURL}${options.url}`, {
    body: options.data,
    params: options.params,
    method: options.method,
    headers: options.headers,
    lazy
  })
}
