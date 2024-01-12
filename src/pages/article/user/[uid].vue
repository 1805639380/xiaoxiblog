<template>
  <NuxtLayout name="default">
    <Title>{{ $route.query?.username }}的文章</Title>
    <Banner height="50vh">{{ $route.query?.username }}的文章</Banner>
    <NuxtLayout name="container">
      <template #containerLeftMain>
        <ArticleSearchShow
          :article-list="articleList"
          :pending="pending"
        ></ArticleSearchShow>
      </template>
    </NuxtLayout>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getArticleByUid } from "@/api/articleApi";

definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.uid as string);
  },
});

const route = useRoute();
const { data: getArticleByUidResponse, pending } = await getArticleByUid({
  uid: +route.params.uid,
  offset: 100,
});
const articleList = ref([]);
watch(
  getArticleByUidResponse,
  (newVal) => {
    if (newVal) articleList.value = newVal?.data?.rows;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.article_list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  --gap: 10px;
  --show-column: 3;
  gap: var(--gap);
}
.article_item {
  width: calc(
    100% / var(--show-column) -
      calc(var(--gap) * (var(--show-column) - 1) / var(--show-column))
  );
}
.article_info {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.article_image {
  width: 100%;
  height: 250px;
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
