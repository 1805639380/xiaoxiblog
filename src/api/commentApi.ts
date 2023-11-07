import type { Comment } from "~/types/comment";
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

/**
 * 查询评论
 * @param data
 * @returns
 */
export const selectComment = (data: selectCommentDataType) => {
  return useRequest<ResponseData<Comment>>({
    url: API_PREFIX + "/" + data.article_id,
    method: "GET",
    params: data,
  });
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

export const delComment = (id: number) => {
  return useRequest({
    url: API_PREFIX + "/del/" + id,
    method: "DELETE",
  });
};
