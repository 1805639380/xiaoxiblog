<template>
  <nuxt-layout name="default">
    <Banner :height="'50vh'" :background="headBackground">归档</Banner>
    <nuxt-layout name="container" :showUserInfo="false">
      <template #containerLeftMain>
        <el-skeleton v-if="articlesGroup.length < 1 && pending" animated></el-skeleton>
        <el-empty v-else-if="!pending && articlesGroup.length < 1" description="内容为空" />
        <el-timeline v-else>
          <template v-for="parent_item in articlesGroup">
            <el-timeline-item type="primary" :hollow="true" size="large"
              :timestamp="parent_item.year + '年' + parent_item.month + '月'" placement="top">
              <template v-for="item in parent_item.child.rows">
                <nuxt-link :to="'/article/' + item.id">
                  <el-card shadow="hover">
                    <h4>{{ item.title }}</h4>
                    <div class="article_info">
                      <div class="read_num">
                        <el-icon>
                          <View />
                        </el-icon>
                        <div class="num">
                          {{ item.watch_num }}
                        </div>
                      </div>
                      <div class="comment_num">
                        <el-icon>
                          <Comment />
                        </el-icon>
                        <div class="num">
                          {{ item.comment_num }}
                        </div>
                      </div>
                    </div>
                  </el-card>
                </nuxt-link>
              </template>
            </el-timeline-item>
          </template>
        </el-timeline>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup lang="ts">
import {
  ElTimeline,
  ElTimelineItem,
  ElCard,
  ElIcon,
  dayjs,
} from "element-plus";
import { View, Comment } from "@element-plus/icons";
import type { ArticleType } from "~/types/article";
import type { ResponseData } from "~/types/common";
import { getArticleTimeline } from "~/api/articleApi";

useHead({
  title: "归档",
});

const headBackground = 'https://xiaoxiblog.oss-cn-beijing.aliyuncs.com/image/6738fc967bbd5d2bdd83ba0d6cce316422040519.jpg%401256w_708h_%21web-article-pic.webp'

interface ArticleGroup {
  year: string;
  month: string;
  child: ResponseData<ArticleType>;
}

let { data: articles, pending } = await getArticleTimeline<{
  count: number;
  rows: ArticleGroup[];
}>();

const articlesGroup = ref<Array<ArticleGroup>>([]);
// 遍历数据并按照年份和月份进行分类
articlesGroup.value = articles.value?.data?.rows || [];

watch(articles, (newVal) => {
  articlesGroup.value = newVal.data?.rows || [];
});
</script>

<style scoped>
:deep(.el-card) {
  margin: 15px 0;
}

:deep(.el-card__body) {
  overflow: hidden;
}

:deep(.el-timeline) {
  font-family: var(--font-article);
}

h4 {
  float: left;
  width: fit-content;
}

.article_info {
  float: right;
  width: fit-content;
}

.article_info>div {
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
  vertical-align: middle;
}

.article_info>div .num {
  margin-left: 5px;
  width: 30px;
}
</style>
