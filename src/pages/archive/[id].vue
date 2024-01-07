<template>
  <nuxt-layout name="default">
    <Banner :height="'50vh'" :background="backgroundImage">{{
      article_data?.title
    }}</Banner>
    <nuxt-layout name="container" :user="userData" :showUserInfo="false">
      <template #containerLeftMain>
        <el-skeleton :loading="pending" animated style="padding: 25px 10px">
          <template #template>
            <el-skeleton-item
              variant="p"
              style="width: 50%; margin: auto; display: block; height: 28px"
            />
            <div>
              <el-skeleton-item
                variant="p"
                style="margin: 25px auto; display: block; width: 80%"
              />
              <div class="skeletion_text" style="padding: 10px 20px">
                <el-skeleton-item
                  v-for="i in 10"
                  :key="i"
                  variant="p"
                  :style="{
                    width: i % 4 === 0 || i === 1 ? '50%' : '100%',
                    marginBottom: '25px',
                  }"
                  style="margin: 15px 0; display: block"
                />
              </div>
            </div>
          </template>
          <template #default>
            <div class="article_content">
              <div class="article_title">
                <h1>{{ article_data?.title }}</h1>
              </div>
              <div class="article_info">
                <div class="publish_date">
                  <el-icon>
                    <Calendar />
                  </el-icon>
                  <span>{{
                    dayjs(article_data?.publish_date).format("YYYY-MM-DD")
                  }}</span>
                </div>
                <div class="article_author">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>{{ article_data?.author.profile.name }}</span>
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
                  <span>{{ commentData?.data?.count || 0 }}条评论</span>
                </div>
              </div>
              <div id="article" class="content">
                <MdEditor :model-value="article_data?.content" previewOnly />
              </div>
            </div>
          </template>
        </el-skeleton>
        <ClientOnly>
          <UserComment
            :config="config"
            :request-comments="requestComments"
            :article-id="article_data?.id || 0"
            :comment-data="commentData"
          ></UserComment>
        </ClientOnly>
      </template>
      <template #containerRight>
        <!-- <u-anchor
          style="position: sticky; right: 0; top: 100px"
          container="#article"
        ></u-anchor> -->
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup lang="ts">
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import {
  Calendar,
  ChatLineSquare,
  Cellphone,
  UserFilled,
} from "@element-plus/icons";
import emoji from "~/assets/emoji";
import type { ConfigApi, CommentApi } from "undraw-ui";
import { dayjs } from "element-plus";
import { getArticleDetail } from "~/api/articleApi";
import {
  selectComment,
} from "~/api/commentApi";
import type { Comment } from "~/types/comment";
import type { ResponseData, ResponseType } from "~/types/common";

const route = useRoute();

// 获取用户数据
const userData = await useUserState();

const id: string = route.params.id as string;
const {
  data,
  refresh: refreshArticleData,
  pending,
} = await getArticleDetail(id);

const article_data = computed(() => {
  if (!pending.value) {
    if (!data.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }

    return data.value.data.row;
  }
  return null;
});

useHead({
  title: article_data.value?.title || "详情页",
});

// 背景图片
const backgroundImage = computed(() => {
  return "https://cloud.afblog.xyz/image/ec8fc4f2a0ab79395fa197d14c02c98767180942.jpg!v1/format/webp/fh/400";
});

const page = ref(1);
const offset = ref(5);
// 请求评论区数据;
async function requestComments(articleId, page, offset) {
  if (articleId) {
    const { data, refresh: commentRefresh } = await selectComment({
      page: page,
      article_id: articleId,
      offset: offset,
    });
    return data;
  }
}

const commentData = ref<ResponseType<ResponseData<Comment>>>();

watch(data, async (newData) => {
  if (newData) {
    const commentRes = await requestComments(
      newData.data.row.id,
      page.value,
      offset.value
    );
    commentData.value = commentRes.value;

    // 更新评论数据
    config.comments = getComments(commentData?.value?.data.rows) || [];
    config.total = commentData?.value?.data.count || 0;
    getFlatLikeIds();
    config.user.likeIds = flatLikeIds.value;
  }
});

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

const flatLikeIds = ref<any[]>([]);

// 获取评论id数组
function getFlatLikeIds() {
  let likeIds = commentData.value?.data.rows?.map((comment) => {
    const userId = userData.value?.id;
    const commentLikes = comment.likes?.filter((user) => user.id === userId);
    const replyIds = comment.replys.map((reply) => {
      const replyLikes = reply.likes?.filter((user) => user.id === userId);
      if (replyLikes?.length > 0) {
        return reply.id;
      }
    });

    if (commentLikes?.length > 0) {
      return replyIds.concat([comment.id]);
    }
  });
  if (likeIds?.length !== 0) {
    flatLikeIds.value = [].concat(...likeIds);
    flatLikeIds.value = flatLikeIds.value.filter(
      (likeId) => likeId !== undefined
    );
  }
}

if (article_data.value?.id) {
  const commentRes = await requestComments(
    article_data.value.id,
    page.value,
    offset.value
  );
  commentData.value = commentRes.value;
  getFlatLikeIds();
}

const config = reactive<ConfigApi>({
  user: {
    id: userData.value?.id || 0,
    username: userData.value?.name || "游客",
    avatar: userData.value?.avatar || "",
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: flatLikeIds.value || [],
  },
  emoji: emoji,
  comments: getComments(commentData?.value?.data?.rows) || [],
  total: commentData?.value?.data?.count || 0,
});
</script>

<style scoped lang="less">
.article_content {
  min-height: 400px;
  padding: 25px 10px;
  background-color: var(--defaultColor);
  border-radius: 11px;

  .article_title {
    text-align: center;
  }

  .article_info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 15px 0;
    font-family: cursive;

    & > div {
      display: inline-flex;
      margin: 10px;
      align-items: center;

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

@media screen and (max-width: 768px) {
  .article_content {
    font-size: 1.8rem;

    .article_info {
      & > div {
        margin-right: auto;
      }
    }
  }
}
</style>
