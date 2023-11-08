<template>
  <div
    class="head"
    ref="tabBar"
    :class="{
      stickTop: isStickTop,
      loginAndRegister: $route.path == '/login' || $route.path == '/register',
    }"
  >
    <div class="logo">
      <nuxt-link to="/">小析のBlog</nuxt-link>
    </div>
    <div class="menuBtn hide" @click="showMiniMenu">☰</div>
    <div class="menus" :class="{ miniMenuShow: isShowMiniMenu }">
      <div class="closed hide" @click="closeMiniMenu">
        <svg
          t="1699412633290"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4017"
          width="25"
          height="25"
        >
          <path
            d="M801.645714 170.666667l51.833905 51.590095L565.150476 511.951238l288.353524 289.670095-51.833905 51.614477-288.109714-289.450667L225.426286 853.23581 173.592381 801.621333l288.329143-289.670095L173.592381 222.256762 225.426286 170.666667l288.109714 289.426285L801.645714 170.666667z"
            p-id="4018"
          ></path>
        </svg>
      </div>
      <slot>
        <div class="logo">
          <h1>小析的Blog</h1>

        </div>
      </slot>
      <div class="menu" v-for="(item, index) in props.menus" :key="index">
        <nuxt-link :to="item.path"
          ><span class="iconfont" v-html="item.icon"></span
          >{{ item.title }}</nuxt-link
        >
      </div>
    </div>
    <div class="other">
      <div class="search" @click="toggleSearch">
        <span class="iconfont" title="搜索一下吧~">&#xe67d;</span>
      </div>
      <div class="user">
        <nuxt-link to="/login" v-if="!userData">
          <client-only>
            <el-tooltip
              content="您还未登录，点击登录"
              placement="bottom"
              effect="light"
            >
              <span class="iconfont" title="您还未登录，点击登录"
                >&#xe640;</span
              >
            </el-tooltip>
          </client-only>
        </nuxt-link>
        <nuxt-link to="/account" v-else title="点击进入用户管理页面">
          <client-only>
            <el-tooltip
              content="点击进入用户管理页面"
              placement="bottom"
              effect="light"
            >
              <img :src="userData.avatar" alt="" />
            </el-tooltip>
          </client-only>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserStateType } from "~/types/user";

const emit = defineEmits(["toggleSearch"]);

let currentIndex = ref<number>(0);
let isStickTop = ref<boolean>(false);
let isShowMiniMenu = ref<boolean>(false);

interface tabProps {
  menus: Array<{ path: string; icon: string; title: string }>;
  user?: UserStateType;
}

const userData = await useUserState();

const props = defineProps<tabProps>();

function activeClick(index: any) {
  currentIndex.value = index;
}

function toggleSearch() {
  emit("toggleSearch", true);
}

function showMiniMenu() {
  isShowMiniMenu.value = true;
}

function closeMiniMenu() {
  isShowMiniMenu.value = false;
}

onMounted(() => {
  let scroll: number = document.documentElement.scrollTop;
  isStickTop.value = scroll > 10 ? true : false;
  //监听滚动事件
  window.addEventListener("scroll", (e) => {
    //滚动条高度大于10的时候导航栏固定
    scroll = document.documentElement.scrollTop;
    scroll > 10 ? (isStickTop.value = true) : (isStickTop.value = false);
  });
});
</script>

<style>
.menus .router-link-active {
  color: pink;
  font-weight: bold;
}

.loginAndRegister {
  background-color: #fff !important;
  box-shadow: none;
  color: #000 !important;
}

.stickTop {
  background-color: #fff !important;
  box-shadow: 0 -5px 25px #ccc;
  color: #000 !important;
}

@media screen and (max-width: 1200px) {
  .head .menus a {
    font-size: 14px;
    transition: all 0.5s;
  }
}

.head img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.head {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 var(--mtop);
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.2s linear;
  color: var(--defaultColor);
  z-index: 10;
}

.head:hover {
  background-color: var(--defaultColor);
  box-shadow: 0 -5px 25px #ccc;
  color: #000;
}

.head:hover .logo a {
  background-color: rgba(255, 255, 255);
}

.head .logo {
  display: inline-block;
  text-align: center;
  /* width: 7.5rem; */
  font-weight: bold;
}

.head .logo a {
  line-height: 4.5rem;
  font-size: 1.875rem;
  background-color: rgba(255, 244, 244, 0.5);
  border-radius: 15px;
  padding: 0;
}

.head .menus {
  display: flex;
  justify-content: space-around;
}

.hide {
  display: none;
}

.head .other .search a,
.head .other .user a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.head .menus .logo {
  display: none;
}

@media screen and (max-width: 768px) {
  .menuBtn {
    display: block !important;
  }

  .head .menus .logo {
    display: block;
    font-size: 1.5rem;
    padding: 2rem;
    font-family: cursive;
  }

  .closed {
    display: block !important;
  }

  .closed {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .miniMenuShow {
    left: 0 !important;
  }

  .head {
    justify-content: space-between;
    padding: 0;
  }

  .head .logo {
    display: none;
  }

  .menus .menu::after {
    display: none;
  }

  .head .menus {
    /* display: none; */
    position: fixed;
    left: -80vw;
    top: 0;
    flex-direction: column;
    justify-content: start;
    height: 100vh;
    width: 220px;
    background-color: #fff;
    box-shadow: 0 0 10px var(--shadow);
    text-align: center;
    color: #000;
    transition: all 0.5s;
  }

  .head .menus a {
    width: 11rem;
    line-height: 50px;
  }

  .other {
    margin-right: 15px;
  }

  .head .other .search,
  .head .other .user {
    width: 5rem;
  }
  .head .other .user {
    height: 5rem;
  }
}

.menus a {
  display: inline-block;
  letter-spacing: 2px;
  text-align: center;
  line-height: 4.375rem;
  width: 5rem;
}

.head .other {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search,
.user {
  width: 3rem;
  text-align: center;
  cursor: pointer;
}
.user {
  height: 3rem;
}

.head .other .search:hover,
.head .other .user:hover {
  color: aqua;
  transition: all 0.5s;
}

.head .other .search span,
.head .other .user span {
  font-size: 25px;
}

.menuBtn {
  line-height: 55px;
  font-size: 25px;
  margin-left: 15px;
}
</style>
