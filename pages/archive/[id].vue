<template>
  <nuxt-layout name="default">
    <Banner :height="'80vh'" :background="background">{{
      article_data?.title
    }}</Banner>
    <nuxt-layout name="container" :user="userData">
      <template #containerLeftMain>
        <div class="article_content">
          <div class="article_title">
            <h1>{{ article_data?.title }}</h1>
          </div>
          <div class="article_info">
            <div class="publish_date">
              <el-icon>
                <Calendar />
              </el-icon>
              <span>{{ article_data?.publish_date?.split(" ")[0] }}</span>
            </div>
            <div class="article_author">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>{{ article_data?.author_id }}</span>
            </div>
            <div class="article_watch">
              <el-icon>
                <Cellphone />
              </el-icon>
              <span>{{ article_data?.watch_num }}次阅读</span>
            </div>
            <div class="comment_num">
              <el-icon>
                <ChatLineSquare />
              </el-icon>
              <span>{{ commentData?.data.count || 0 }}条评论</span>
            </div>
          </div>
          <div id="article" class="content">
            <MdEditor :model-value="article_data?.content" previewOnly />
          </div>
        </div>
        <ClientOnly>
          <u-comment-scroll
            :disable="disableScrollComment"
            @more="getMoreComment"
          >
            <u-comment
              page
              :config="config"
              style="width: 100%"
              @operate="operate"
              @submit="submit"
              @like="like"
            >
              <template v-if="config.comments.length < 1">&nbsp;</template>
            </u-comment>
          </u-comment-scroll>
        </ClientOnly>
      </template>
      <template #containerRight>
        <u-anchor
          style="position: sticky; right: 0; top: 100px"
          container="#article"
        ></u-anchor>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup lang="ts">
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { toReactive } from "@vueuse/core";
import {
  Calendar,
  ChatLineSquare,
  Cellphone,
  UserFilled,
} from "@element-plus/icons";
import emoji from "@/assets/emoji";
import { CommentApi, ConfigApi, UToast, throttle } from "undraw-ui";
import { ArticleType } from "~/types/article";
import { dayjs } from "element-plus";
import { LikesCommentData } from "~/composables/commentApi";

const background = ref(
  "https://img-baofun.zhhainiao.com/fs/71e6812c9fec3f987897c8763a7f385f.jpg"
);

const route = useRoute();

// 是否禁用滚动加载评论
const disableScrollComment = ref(false);
const id: string = route.params.id as string;
const { data, refresh: refreshArticleData } = await getArticleDetail(id);

const article_data: ArticleType = toReactive((data.value as any).data.row);

background.value = article_data?.pic;
useHead({
  title: article_data?.title || "详情页",
});

const page = ref(1);
const offset = ref(5);

const userData = await useUserState();

async function requestComments(page, offset) {
  const { data, refresh: commentRefresh } = await selectComment({
    page: page,
    article_id: article_data?.id,
    offset: offset,
  });

  return data;
}

// 获取评论区数据;
const commentData = await requestComments(page.value, offset.value);

const dateFormat = "YYYY-MM-DD";

// 将数据处理成CommentApi类型
function getComments(commentRows): CommentApi[] {
  return commentRows?.map((item): CommentApi => {
    const replyList = item.replys?.map((reply): CommentApi => {
      return {
        id: reply.id,
        parentId: reply.comment_id,
        uid: reply.user_id,
        address: "",
        likes: reply.likes.length,
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
      likes: item.likes.length,
      user: {
        username: item.user.profile.name,
        avatar: item.user.profile.avatar,
        level: item.user.role,
        homeLink: "/",
      },
      // createTime: dayjs(item.createTime).format(dateFormat),
      createTime: formatRelativeTime(item.createTime),
      reply: {
        total: item.replys.length,
        list: replyList,
      },
    };
  });
}

/**
 * 格式化日期
 * @param createdAt
 */
function formatRelativeTime(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const timeDifferenceInSeconds = Math.floor(
    ((now as any) - (createdDate as any)) / 1000
  );

  if (timeDifferenceInSeconds < 60) {
    return `刚刚`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo}分钟前`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo}小时前`;
  } else if (timeDifferenceInSeconds < 259200) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo}天前`;
  } else {
    // 如果超过3天，则显示日期
    return dayjs(createdDate).format(dateFormat);
  }
}

let likeIds = commentData.value?.data.rows?.map((comment) => {
  const userId = userData.value?.id;
  const commentLikes = comment.likes?.filter((user) => user.id === userId);
  const replyIds = comment.replys.map((reply) => {
    const replyLikes = reply.likes?.filter((user) => user.id === userId);
    if (replyLikes.length > 0) {
      return reply.id;
    }
  });

  if (commentLikes.length > 0) {
    return replyIds.concat([comment.id]);
  }
});
let flatLikeIds: number[] = [].concat(...likeIds);
flatLikeIds = flatLikeIds.filter((likeId) => likeId !== undefined);

const config = reactive<ConfigApi>({
  user: {
    id: userData.value?.id || 0,
    username: userData.value?.name || "游客",
    avatar: userData.value?.avatar || "",
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: flatLikeIds || [],
  },
  emoji: emoji,
  comments: getComments(commentData.value?.data.rows) || [],
  total: commentData.value?.data.count || 0,
});

let total = commentData.value.data.count;
// 加载更多评论
const getMoreComment = () => {
  if (page.value <= Math.ceil(total / offset.value)) {
    setTimeout(async () => {
      page.value = page.value + 1;
      const commentData = await requestComments(page.value, offset.value);
      const comments = getComments(commentData.value.data.rows);
      config.comments.push(...comments);
    }, 200);
  } else {
    disableScrollComment.value = true;
  }
};

// 提交评论事件;
const submit = async ({ content, parentId, finish }) => {
  console.log("提交评论: " + content, parentId);

  const comment: CommentApi = {
    id: (config.comments[config.comments.length - 1]?.id as number) + 1 || 1,
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
      article_id: article_data.id,
    });
    if (data.value?.code === 1001) {
      setTimeout(async () => {
        finish(comment);
        if (commentData.value.data.count >= 10) {
          config.comments.pop();
        }
        UToast({ message: "评论成功!", type: "success" });
      }, 200);
    } else {
      UToast({ message: "服务器繁忙，请稍后再试！", type: "warn" });
    }
  } else {
    const { data } = await replyComment({
      content,
      user_id: config.user.id as number,
      comment_id: +parentId,
    });

    if (data.value?.code === 1001) {
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

  const likeIdArr = config.user.likeIds.filter(
    (commentId) => commentId === +id
  );
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

  if (likeIdArr.length > 0) {
    isLike.value = false;
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

<style scoped lang="less">
.article_content {
  min-height: 400px;
  padding: 25px 10px;
  background-color: var(--defaultColor);
  border-radius: 11px;
  box-shadow: 0 1px 20px -8px var(--shadow);

  .article_title {
    text-align: center;
  }

  .article_info {
    display: flex;
    justify-content: center;
    margin: 15px 0;
    font-family: cursive;

    & > div {
      display: inline-flex;
      margin: 0 10px;

      :deep(.el-icon) {
        margin-right: 5px;
      }
    }
  }

  .content {
    font-size: 16px;
    color: #444;

    .md-previewOnly {
      font-family: "Noto Serif SC", "Source Han Serif SC", "Source Han Serif",
        source-han-serif-sc, "PT Serif", "SongTi SC", "MicroSoft Yahei", Georgia,
        serif;
    }
  }
}

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
</style>
