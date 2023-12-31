<template>
  <div id="defaultLayout" :style="{ paddingTop: headStickTop && '5rem' }">
    <Header :menus="menus" :user="props.user" :stick-top="headStickTop" @toggleSearch="toggleSearch"></Header>
    <BackTop />
    <LazySearch :isSearchShow="isSearchShow" @toggleSearch="toggleSearch" />
    <slot></slot>
    <Footer v-if="showFooter" />
    <Pet></Pet>
    <ClientOnly>
      <GlobalMusic />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { UserStateType } from "~/types/user";

const props = withDefaults(defineProps<{
  user?: UserStateType;
  headStickTop?: boolean;
  showFooter?: boolean;
}>(), {
  showFooter: true,
});

let isSearchShow = ref(false);

let menus = [
  {
    title: "首页",
    icon: "&#xe6e6;",
    path: "/",
  },
  {
    title: "归档",
    icon: "&#xe6b8;",
    path: "/archive",
  },
  // {
  //   title: "清单",
  //   icon: "&#xe677;",
  //   path: "/list"
  // },
  {
    title: "聊天室",
    icon: "&#xe63a;",
    path: "/chat",
  },
  // {
  //   title: "留言板",
  //   icon: "&#xe60c;",
  //   path: "/message"
  // },
  // {
  //   title: "友人帐",
  //   icon: "&#xe6bc;",
  //   path: "/friends"
  // },
  {
    title: "关于",
    icon: "&#xe608;",
    path: "/about",
  },
];

function toggleSearch(flag) {
  isSearchShow.value = flag;
}

onMounted(() => {
  // isShowLoading.value = false;
});
</script>

<style></style>
