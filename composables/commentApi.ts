const API_PREFIX = '/comment'

interface selectCommentDataType {
    page?: number,
    totalNum?: number,
    search?: string,
    article_id: string
}

interface addCommentDataType {
    comment_content: string,
    comment_uid: number,
    article_id: string
}

/**
 * 查询评论
 * @param data 
 * @returns 
 */
export const selectComment = (data: selectCommentDataType) => {
    return useRequest({
        url: API_PREFIX,
        method: 'GET',
        params: data
    })
}

/**
 * 发表评论
 * @param data 
 * @returns 
 */
export const addComment = (data: addCommentDataType) => {
    return useRequest({
        url: API_PREFIX + '/add',
        method: 'POST',
        data
    })
}

export const delComment = (id: number) => {
    return useRequest({
        url: API_PREFIX + '/del/' + id,
        method: 'DELETE',
    })
}