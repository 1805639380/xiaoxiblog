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
              <span>{{ commentData?.data.total || 0 }}条评论</span>
            </div>
          </div>
          <div id="article" class="content">
            <MdEditor v-model="article_data.content" previewOnly />
          </div>
        </div>
        <ClientOnly>
          <u-comment
            page
            @operate="operate"
            :config="config"
            style="width: 100%"
            @submit="submit"
            @like="like"
            @reply-more=""
            @reply-page=""
            @get-user=""
          >
            <template v-if="config.comments.length < 1">&nbsp;</template>
          </u-comment>
        </ClientOnly>
      </template>
      <template #containerRight>
        <!-- <u-anchor style="position: sticky;right: 0;top: 100px;" container="#article"></u-anchor> -->
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

const background = ref(
  "https://img-baofun.zhhainiao.com/fs/71e6812c9fec3f987897c8763a7f385f.jpg"
);

const route = useRoute();

const id: string = route.params.id as string;
const { data, refresh: refreshArticleData } = await getArticleDetail(id);

let resData = data.value;

const article_data: ArticleType = toReactive(resData?.data.row);

background.value = article_data.pic;
useHead({
  title: article_data.title || "详情页",
});

const userData = await useUserState();

// 获取评论区数据
const { data: commentData, refresh: commentRefresh } = await selectComment({
  article_id: article_data.id,
});

// await refreshNuxtData()

const config = reactive<ConfigApi>({
  user: {
    id: userData.value?.id || 0,
    username: userData.value?.name || "游客",
    avatar: userData.value?.avatar || "",
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [],
  },
  emoji: emoji,
  comments: commentData.value?.data.data_result || [],
  total: commentData.value?.data.total || 0,
  // 默认全部用户显示，#1当前用户显示，#2当前用户以外显示
  tools: ["举报#2", "删除#1", "复制", "屏蔽#2"],
});

// 提交评论事件
const submit = async ({ content, parentId, finish }) => {
  console.log("提交评论: " + content, parentId);

  const comment: CommentApi = {
    id: (config.comments[config.comments.length - 1]?.id as number) + 1 || 1,
    parentId: parentId,
    uid: config.user.id,
    address: "",
    content: content,
    likes: 0,
    createTime: new Date().toLocaleString(),
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 6,
      homeLink: `/1`,
    },
    reply: null,
  };

  if (!parentId) {
    // 评论请求
    let { data } = await addComment({
      comment_content: content,
      comment_uid: config.user.id as number,
      article_id: article_data.article_id,
    });
    if (data.value?.status === 200) {
      setTimeout(async () => {
        finish(comment);
        config.comments.pop();
        UToast({ message: "评论成功!", type: "success" });
      }, 200);
    } else {
      UToast({ message: "服务器繁忙，请稍后再试！", type: "warning" });
    }
  } else {
    // 回复评论请求
    setTimeout(async () => {
      finish(comment);
      UToast({ message: "评论成功!", type: "success" });
      commentRefresh();
    }, 200);
  }
};
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
  console.log("点赞: " + id);
  setTimeout(() => {
    finish();
  }, 200);
};

let commentkeymap = {
  comment_content: "content",
  comment_date: "createTime",
  comment_id: "id",
  comment_uid: "uid",
  parent_comment_uid: "parentId",
  comment_user: "user",
};

let userKeyMap = {
  hdportrait: "avatar",
  nickname: "username",
};

// let commentResult = toRaw(commentData.value.data.data_result)
// // 替换comment key
// for (let item of commentResult) {
//   Object.keys(item).map(keys => {
//     let newKey = commentkeymap[keys]

//     if (newKey) {
//       item[newKey] = item[keys]
//       item['likes'] = 0
//       delete item[keys]
//     }
//   })
// }

// // 替换comment 中user key
// for (let item of commentResult) {
//   Object.keys(item.user).map(keys => {
//     let newKey = userKeyMap[keys]

//     if (newKey) {
//       item.user[newKey] = item.user[keys]
//       item.user['level'] = 6
//       item.user['homeLink'] = '/1'
//       delete item.user[keys]
//     }
//   })
// }

// config.comments = commentData.value.data.data_result

const _throttle = throttle(
  async (type: string, comment: CommentApi, finish: Function) => {
    switch (type) {
      case "删除":
        let { data } = await delComment(comment.id as number);
        if (data.value.status === 200) {
          UToast({ message: "删除成功", type: "success" });
          commentRefresh();
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
</style>
