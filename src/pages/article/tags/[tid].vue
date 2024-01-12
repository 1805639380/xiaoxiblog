<template>
  <NuxtLayout name="default">
    <Title>{{ route.query.tagName }}</Title>
    <Banner :height="'50vh'">{{ route.query.tagName }}</Banner>
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
import { getArticleByTagId } from "~/api/articleApi";
definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.tid as string);
  },
});

const route = useRoute();
const { data: getArticleByTagIdResponse, pending } = await getArticleByTagId({
  tagId: +(route.params.tid as string),
  offset: 100,
});
const articleList = ref(getArticleByTagIdResponse.value?.data?.rows || []);
watch(
  getArticleByTagIdResponse,
  (newVal) => {
    articleList.value = newVal.data.rows || [];
  },
  { deep: true }
);
</script>

<style scoped></style>
