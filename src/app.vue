<template>
  <Loading
    v-if="isShowLoading"
    :completeHandle="completeHandle"
    :isComplete="isComplete"
  ></Loading>
  <div id="app">
    <NuxtPage
      class="nuxt_page"
      :class="{ loadingComplete: isComplete && loadingAnimateCompleteNum > 0 }"
    ></NuxtPage>
  </div>
</template>

<script setup lang="ts">
import nprogress from "nprogress";
import "animate.css";

const isShowLoading = ref(true);

const nuxtApp = useNuxtApp();

const router = useRouter();

nprogress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
const loadingAnimateCompleteNum = ref(0);
const completeHandle = (index:number) => {
  if (index > 1) {
    isShowLoading.value = false 
  }
  loadingAnimateCompleteNum.value = index
}

const userState = await useUserState();

await keepUserData(userState);

nuxtApp.hook("page:start", () => {
  nprogress.start();
});
const isComplete = ref(false);
provide("isLoadingComplete", isComplete);

nuxtApp.hook("page:finish", () => {
  isComplete.value = true;
  nprogress.done();
  if (process.client) {
    window.scrollTo(0, 0);
  }
});

router.beforeEach(async (to, from, next) => {
  next();
});
</script>

<style>
@import url("@/assets/css/base.css");
@import url("@/assets/font/iconfont.css");
@import url("@/assets/font/font.css");
@import "element-plus/dist/index.css";
@import "nprogress/nprogress.css";

.nuxt_page {
  filter: blur(100px);
  overflow: hidden;
  transition: filter 1s linear;
}
.loadingComplete {
  filter: none;
}
/* showContent */
.showContent {
  padding-top: 85.05px;
}

.menu {
  display: inline-block;
}

.menu::after {
  content: "";
  position: relative;
  bottom: 15px;
  display: block;
  width: 0rem;
  height: 5px;
  margin: 0 auto;
  background-color: orange;
  transition: 1s all cubic-bezier(0.46, 1, 0.23, 1);
}

.menu:hover::after {
  width: 5rem;
}

.container {
  display: flex;
  justify-content: center;
  /* padding: 50px 0; */
  padding: var(--mtop) 0;
  /* background-image: url('assets/img/kyotoanimation.png'); */
}
</style>
