<template>
  <div class="userComment">
    <u-comment-scroll :disable="disableScrollComment" @more="getMoreComment">
      <u-comment
        page
        :config="config"
        style="width: 100%"
        @reply-page="getMoreReply"
        @submit="submit"
        @like="like"
      >
        <template v-if="config.comments?.length < 1">&nbsp;</template>
      </u-comment>
    </u-comment-scroll>
  </div>
</template>

<script setup lang="ts">
import {
  UToast,
  type CommentApi,
  type ConfigApi,
  type ReplyPageParamApi,
  throttle,
} from "undraw-ui";
import {
  addComment,
  getCommentReply,
  replyComment,
  type LikesCommentData,
  likesComment,
  delComment,
} from "~/api/commentApi";
import type { Comment } from "~/types/comment";
import type { ResponseData, ResponseType } from "~/types/common";

const props = withDefaults(
  defineProps<{
    config: ConfigApi;
    requestComments: Function;
    articleId: number;
    offset?: number;
    commentData: ResponseType<ResponseData<Comment>> | any;
  }>(),
  {
    offset: 5,
  }
);

const page = ref(1);
const offset = ref(props.offset);

// 是否禁用滚动加载评论
const disableScrollComment = ref(false);

// 加载更多评论
const getMoreComment = () => {
  const commentData = props.commentData;
  if (page.value <= Math.ceil(commentData.data.count / offset.value)) {
    setTimeout(async () => {
      page.value = page.value + 1;
      const commentData = await props.requestComments(
        props.articleId,
        page.value,
        offset.value
      );
      const comments =
        commentData.value && getComments(commentData.value.data.rows);
      if (comments?.length > 0) props.config.comments.push(...comments);
    }, 200);
  } else {
    disableScrollComment.value = true;
  }
};

// 将数据处理成CommentApi类型
function getComments(commentRows): CommentApi[] {
  return commentRows?.map((item): CommentApi => {
    const replyList = item.replys?.map((reply): CommentApi => {
      return {
        id: reply.id,
        parentId: reply.comment_id,
        uid: reply.user_id,
        address: "",
        likes: reply.likes?.length,
        user: {
          username: reply.user.profile.name,
          avatar: reply.user.profile.avatar,
          level: reply.user.role,
          homeLink: "/",
        },
        // createTime: dayjs(reply.createTime).format(dateFormat),
        createTime: formatRelativeTime(reply.createTime),
        content: reply.content,
      };
    });

    return {
      id: item.id,
      parentId: null,
      uid: item.user?.id || 0,
      address: "",
      content: item.content,
      likes: item.likes?.length,
      user: {
        username: item.user.profile.name,
        avatar: item.user.profile.avatar,
        level: item.user.role,
        homeLink: "/",
      },
      // createTime: dayjs(item.createTime).format(dateFormat),
      createTime: formatRelativeTime(item.createTime),
      reply: {
        total: item.replys?.length,
        list: replyList,
      },
    };
  });
}

// 加载更多回复
const getMoreReply = async ({
  pageNum,
  pageSize,
  parentId,
  finish,
}: ReplyPageParamApi) => {
  const { data: replyData } = await getCommentReply({
    page: pageNum,
    offset: +pageSize,
    comment_id: +parentId,
  });
  if (replyData.value?.code === 1001) {
    finish({
      total: replyData.value?.data?.count,
      list: getComments(replyData.value?.data?.rows),
    });
  }
};

// 提交评论事件;
const submit = async ({ content, parentId, finish }) => {
  console.log("提交评论: " + content, parentId);
  const config = props.config;
  const comment: CommentApi = {
    id: 1,
    parentId: parentId,
    uid: config.user.id,
    address: "",
    content: content,
    likes: 0,
    createTime: formatRelativeTime(new Date()),
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 1,
      homeLink: `/1`,
    },
    reply: null,
  };

  if (!parentId) {
    // 评论请求
    let { data } = await addComment({
      content: content,
      user_id: config.user.id as number,
      article_id: props.articleId,
    });
    if (data.value?.code === 1001) {
      setTimeout(async () => {
        comment.id = data.value?.data.row.id;
        finish(comment);
        if (props.commentData.data.count >= 10) {
          config.comments.pop();
        }
        UToast({ message: "评论成功!", type: "success" });
      }, 200);
    } else {
      UToast({ message: "服务器繁忙，请稍后再试！", type: "warn" });
    }
  } else {
    // 回复评论请求
    const currentReplyComment = config.comments.find(
      (item) => item.id === +parentId
    );
    let replyList = currentReplyComment?.reply?.list || [];
    replyList = replyList.sort((a, b) => {
      return +b.id - +a.id;
    });
    comment.id = (replyList[0]?.id as number) + 1 || 1;
    const { data } = await replyComment({
      content,
      user_id: config.user.id as number,
      comment_id: +parentId,
    });

    if (data.value?.code === 1001) {
      comment.id = data.value?.data.row.id;
      // 回复评论请求
      setTimeout(async () => {
        finish(comment);
        UToast({ message: "评论成功!", type: "success" });
      }, 200);
    } else {
      UToast({ message: data.value.message, type: "warn" });
    }
  }
};

const isLike = ref(true);
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = async (id: string, finish: () => void) => {
  // 确保在函数内部定义的变量不被多次调用时重置
  let isThrottled = false;
  const config = props.config;
  const likeIdArr = config.user.likeIds.filter(
    (commentId) => commentId === +id
  );
  if (likeIdArr?.length > 0) {
    isLike.value = false;
  }
  const event = window.event;

  if (isThrottled) {
    // 如果正在节流中，不执行任何操作
    return;
  }
  // 设置节流状态为 true，防止多次调用
  isThrottled = true;

  let targetElement = event.target as HTMLDivElement;
  const option: LikesCommentData = {
    id: +id,
    userId: +config.user.id,
    flag: isLike.value,
  };
  const parentElement = targetElement.closest(".reply");
  if (parentElement) {
    option.isReply = true;
  }

  const { data } = await likesComment(option);
  if (data.value?.code === 1001) {
    isLike.value = false;
    setTimeout(() => {
      finish();
      // 节流时间到后，重置节流状态以允许下一次操作
      isThrottled = false;
    }, 200);
  } else {
    UToast({ message: data.value?.message, type: "warn" });
    // 节流时间到后，重置节流状态以允许下一次操作
    isThrottled = false;
  }
};

const _throttle = throttle(
  async (type: string, comment: CommentApi, finish: Function) => {
    switch (type) {
      case "删除":
        let { data } = await delComment(comment.id as number);
        if (data.value.code === 1001) {
          UToast({ message: "删除成功", type: "success" });
        } else {
          UToast({ message: "服务器繁忙，请稍后再试!", type: "error" });
        }
        finish();
        break;
      case "举报":
        UToast({ message: "举报成功", type: "success" });
        // alert(`举报成功: ${comment.id}`)
        break;
    }
  }
);

const operate = (type: string, comment: CommentApi, finish: Function) => {
  _throttle(type, comment, finish);
};

function loadComment() {}
</script>

<style scoped>
.u-comment {
  padding: 0 !important;
}
:deep(.comment-main .user-info .time) {
  font-family: var(--font-article);
}

:deep(.txt-box),
:deep(.action-box) {
  font-family: "Merriweather Sans", Helvetica, Tahoma, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
}
:deep(.reply-box) {
  background: #fff;
}
</style>
