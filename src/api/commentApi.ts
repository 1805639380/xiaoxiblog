import type { Comment, Reply } from "~/types/comment";
import type { ResponseData } from "~/types/common";

const API_PREFIX = "/comment";

interface selectCommentDataType {
  page?: number;
  offset?: number;
  article_id: number;
}

interface addCommentDataType {
  user_id: number;
  article_id: number;
  content: string;
}

interface SelectCommentResponse {
  rows: Comment;
}

interface ReplyCommentData {
  user_id: number;
  comment_id: number;
  content: string;
}

export interface LikesCommentData {
  id: number;
  flag?: boolean;
  isReply?: boolean;
  userId: number;
}

interface SelectCommentResponseData {
  page?: number;
  offset?: number;
  comment_id: number;
}

/**
 * 查询评论
 * @param data
 * @returns
 */
export const selectComment = (data: selectCommentDataType) => {
  return useRequest<ResponseData<Comment>>(
    {
      url: API_PREFIX + "/" + data.article_id,
      method: "GET",
      params: data,
    },
    true
  );
};

/**
 * 发表评论
 * @param data
 * @returns
 */
export const addComment = (data: addCommentDataType) => {
  return useRequest<ResponseData<any>>({
    url: API_PREFIX,
    method: "POST",
    data,
  });
};

/**
 * 回复评论
 * @param data
 * @returns
 */
export const replyComment = (data: ReplyCommentData) => {
  return useRequest<ResponseData<any>>({
    url: API_PREFIX + "/reply",
    method: "POST",
    data,
  });
};

/**
 * 评论点赞
 * @param data
 * @returns
 */
export const likesComment = (data: LikesCommentData) => {
  return useRequest<ResponseData<any>>({
    url: API_PREFIX + "/" + data.id + "/likes",
    method: "PATCH",
    data,
  });
};

/**
 * 删除评论
 * @param id
 * @returns
 */
export const delComment = (id: number) => {
  return useRequest({
    url: API_PREFIX + "/del/" + id,
    method: "DELETE",
  });
};

/**
 * 获取评论回复
 * @param data
 * @returns
 */
export const getCommentReply = (data: SelectCommentResponseData) => {
  return useRequest<ResponseData<Reply>>({
    url: API_PREFIX + "/" + data.comment_id + "/reply/",
    method: "GET",
    params: data,
  });
};
