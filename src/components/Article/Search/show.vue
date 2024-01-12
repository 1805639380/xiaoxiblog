<template>
  <el-skeleton animated :loading="pending">
    <template #template>
      <div class="article_list">
        <div class="article_item" v-for="item in showColumn">
          <el-skeleton-item variant="image" class="article_image" />
          <div
            style="
              padding: 5px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            "
          >
            <el-skeleton-item variant="p" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                gap: 10px;
              "
            >
              <el-skeleton-item
                variant="text"
                v-for="item in 3"
                style="width: 30%"
              />
            </div>
            <el-skeleton-item variant="text" style="width: 50%" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="article_list">
        <div
          class="article_item"
          v-for="article in articleList"
          :key="article.id"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <NuxtLink :to="'/article/' + article.id">
              <img
                :src="
                  transformUpYunPicUrl({
                    url: article.pic,
                    options: {
                      height: 250,
                    },
                  })
                "
                class="article_image"
              />
              <div style="padding: 14px" class="article_info">
                <div class="article_title">
                  <span>{{ article.title }}</span>
                </div>
                <div class="tags">
                  <el-row :gutter="10">
                    <el-col
                      :span="8.5"
                      v-for="tagName in article.tags"
                      :key="tagName"
                    >
                      <el-tag :type="getRandomArrayString()">{{
                        tagName
                      }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom">
                  <div class="article_time">
                    <el-icon><Calendar /></el-icon>
                    <time class="time">{{
                      dayjs(article.publish_date).format("YYYY-MM-DD")
                    }}</time>
                  </div>
                  <div class="article_type">{{ article.type }}</div>
                </div>
              </div>
            </NuxtLink>
          </el-card>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { Calendar } from "@element-plus/icons";
import { dayjs } from "element-plus";
import type { ArticleType } from "~/types/article";
const showColumn = ref(3);

const props = defineProps<{
  articleList: ArticleType[];
  pending: boolean;
}>();

/**
 * @description: 根据窗口宽度调整文章列表显示列数
 */
const resizeArticleItemColum = () => {
  if (window.innerWidth > 1240) {
    showColumn.value = 3;
  } else if (window.innerWidth > 768) {
    showColumn.value = 2;
  } else {
    showColumn.value = 1;
  }
};
onMounted(() => {
  resizeArticleItemColum();
  window.addEventListener("resize", resizeArticleItemColum);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeArticleItemColum);
});
</script>

<style scoped>
.article_list {
  /* display: flex; */
  align-items: center;
  flex-wrap: wrap;
  --gap: 10px;
  --show-column: 3;
  column-count: var(--show-column);
  gap: var(--gap);
}
.article_item {
  /* 自动计算宽度 */
  /* width: calc(
    100% / var(--show-column) -
    calc(var(--gap) * (var(--show-column) - 1) / var(--show-column))
    ); */
  width: auto;
  margin-bottom: var(--gap);
  page-break-inside: avoid;
  break-inside: avoid;
}
.article_info {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.article_image {
  width: 100%;
  object-fit: cover;
}
.tags .el-row {
  row-gap: 10px;
}
.time {
  font-size: 0.9rem;
}
.article_time {
  display: flex;
  align-items: center;
  column-gap: 5px;
}
.article_item .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 1240px) {
  .article_list {
    --show-column: 2;
  }
}
@media screen and (max-width: 768px) {
  .article_list {
    --show-column: 1;
  }
  .article_title {
    font-size: 1.5rem;
  }
  .time {
    font-size: 1.3rem;
  }
  .article_type,
  .el-icon {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 564px) {
  .article_title {
    font-size: 16px;
  }
  .article_type,
  .el-icon {
    font-size: 14px;
  }
  .time {
    font-size: 12px;
  }
}
</style>
