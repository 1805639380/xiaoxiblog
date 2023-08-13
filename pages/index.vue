<template>
  <div class="home">
    <nuxt-layout name="default" :user="userData">
      <Banner :showWar="true">
        <span ref="typedString" class="typedString"></span>
      </Banner>
      <nuxt-layout name="container" :user="userData">
        <template #containerLeftTop>
          <Notice />
        </template>
        <template #containerLeftMain>
          <ArticleWrap :currentPage="1" :articleList="artilceData"></ArticleWrap>
        </template>
      </nuxt-layout>
    </nuxt-layout>
  </div>
</template>
  
<script setup lang='ts'>
import { toReactive } from '@vueuse/core';
import articleType from '~~/types/article';
import Typed from 'typed.js';

let artilceData = reactive<Array<articleType>>([])

const typedString = ref<Element | null>(null)

let options = {
  strings: ['<span>Hello World!</span>'],
  typeSpeed: 40,
  // loop: true
  backSpeed: 100,
  loop: true,
  smartBackspace: true,
};

onMounted(() => {
  let typed = new Typed(typedString.value, options);

})


useHead({
  title: "首页"
})

const [err, userData] = await useCatch(useUserState())

let { data: article_res, refresh } = await selectArticle()

artilceData = toReactive(article_res.value?.data)


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