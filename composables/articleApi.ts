
interface selectArticleDataType {
  page?: number,
  totalNum?: number,
  search?: string
}

const API_PREFIX = '/article'

export const updateArticle = <T> (id: string, data: {article_watch: number}) => {
  return useReqTs<T>({
    url: API_PREFIX + '/update/' + id,
    data,
    method: "PATCH"
  })
}

/**
 * 获取时间线
 * @returns 
 */
export const getArticleTimeline = <T>() => {
  return useReqTs<T>({
    url: API_PREFIX + '/timeline',
    method: "GET"
  })
}

/**
 * 查询文章
 * @param data
 * @returns 
 */
export const selectArticle = (data: selectArticleDataType = { page: 1, totalNum: 5 }) => {

  const params: selectArticleDataType = {}

  for (const key in data) {

    if (data[key]) {
      params[key] = data[key]
    }
  }

  return useRequest({
    url: API_PREFIX,
    method: "GET",
    params: params
  })
}

/**
 * 获取文章详情
 * @param id 
 * @returns 
 */
export const getArticleDetail = (id: string) => {

  return useRequest({
    url: API_PREFIX + '/' + id,
    method: "GET"
  })
}

/**
 * 添加文章
 * @param data 
 * @returns 
 */
export const addArticle = (data) => {
  return useRequest({
    url: API_PREFIX + '/add',
    method: "POST",
    data
  })
}