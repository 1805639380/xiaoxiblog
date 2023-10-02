<template>
  <div class="home">
    <nuxt-layout name="default" :user="userData">
      <Banner :showWar="true" :gradationText="true" height="100vh">
        <span ref="typedString" class="typedString"></span>
      </Banner>
      <nuxt-layout name="container" :user="userData">
        <template #containerLeftTop>
          <Notice />
        </template>
        <template #containerLeftMain>
          <ArticleWrap
            :currentPage="1"
            :offset="5"
            :articleList="artilceData"
            :count="articleCount"
          ></ArticleWrap>
        </template>
      </nuxt-layout>
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
import Typed from "typed.js";
import { ArticleType } from "~/types/article";

const artilceData = ref<Array<ArticleType>>([]);
const articleCount = ref<number>(0);

const typedString = ref<Element | null>(null);

let options = {
  strings: [
    "探索，发现自我。",
    "生活，无限美好。",
    "创造，无限可能。",
  ],
  typeSpeed: 100,
  // loop: true
  backSpeed: 100,
  loop: true,
  smartBackspace: true,
};

onMounted(() => {
  let typed = new Typed(typedString.value, options);
});

useHead({
  title: "首页",
});
const userData = await useUserState();

let { data: article_res, refresh } = await selectArticle();
if (article_res.value) {
  artilceData.value = article_res.value?.data.rows;
  articleCount.value = article_res.value?.data.count;
}
</script>

<style scoped>
.home {
  /* background-image: url("~/assets/img/IMG_202207165084_rotated.jpg"); */
  background-size: 40%;
  background-attachment: fixed;
  background-position-x: 0;
  background-position-y: bottom;
  background-repeat: no-repeat;
}
</style>
