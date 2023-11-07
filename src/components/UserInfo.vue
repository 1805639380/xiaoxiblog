<template>
  <div class="userInfo">
    <div class="userIns">
      <img :src="props.user.avatar || defaultAvatar" alt="" />
      <div class="userName">{{ props.user.name || defaultName }}</div>
      <div class="userQianMing">{{ props.user.signature }}</div>
    </div>
    <div class="userData">
      <div class="userArticle">文章</div>
      <div class="label">标签</div>
      <div class="article-num">
        <nuxt-link to="/archive">{{ 0 && props.user.article_num }}</nuxt-link>
      </div>
      <div class="labek-num">
        <nuxt-link to="/archive">{{ 0 && props.user.labelnum }}</nuxt-link>
      </div>
    </div>
    <div class="userContact">
      <a href="javascript:void(0)" title="qq">
        <!-- <el-tooltip v-if="isClient" content="qq" placement="bottom" effect="light"> -->
        <span class="iconfont">&#xe876;</span>
        <!-- </el-tooltip> -->
      </a>
      <a href="javascript:void(0)" title="github">
        <!-- <el-tooltip content="github" placement="bottom" effect="light"> -->
        <span class="iconfont">&#xe534;</span>
        <!-- </el-tooltip> -->
      </a>
      <a href="javascript:void(0)" title="wx">
        <!-- <el-tooltip content="wx" placement="bottom" effect="light"> -->
        <span class="iconfont">&#xe6db;</span>
        <!-- </el-tooltip> -->
      </a>
      <a href="javascript:void(0)" title="bilibili">
        <!-- <el-tooltip content="bilibili" placement="bottom" effect="light"> -->
        <span class="iconfont">&#xe62a;</span>
        <!-- </el-tooltip> -->
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStateType } from "@/types/user";

const props = withDefaults(
  defineProps<{
    user?: UserStateType;
  }>(),
  {
    user: () =>
      <UserStateType>{
        id: 0,
        name: "您还未登录",
        signature: "",
        sex: "男",
        avatar:
          "https://tse4-mm.cn.bing.net/th/id/OIP-C.X-VG5gTN2ak8rGRij3oCogAAAA?w=163&h=180&c=7&r=0&o=5&dpr=1.12&pid=1.7",
        article_num: 0,
      },
  }
);

const defaultAvatar = ref(
  "https://tse4-mm.cn.bing.net/th/id/OIP-C.X-VG5gTN2ak8rGRij3oCogAAAA?w=163&h=180&c=7&r=0&o=5&dpr=1.12&pid=1.7"
);
const defaultName = ref("您还未登陆");
</script>

<style scoped>
.userStick {
  position: fixed;
  top: 5.5rem;
}

.userInfo {
  position: sticky;
  top: 80.05px;
  width: 15.625rem;
  border-radius: 11px;
  padding: 20px 20px 0;
  font-weight: 600;
  font-family: serif;
  box-shadow: 0 1px 20px -8px var(--shadow);
  transition: box-shadow 0.5s;
  font-size: var(--fontSize);
  background-color: var(--defaultColor);
}

.userInfo:hover {
  box-shadow: 0 0 20px var(--shadow);
}

.userInfo div {
  margin: 5px 0;
}

.userInfo .userIns {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.userInfo .userIns img {
  display: block;
  margin: 0 auto;
  width: 7.5rem;
  border-radius: 50%;
}

.userData div {
  text-align: center;
  display: inline-block;
  width: 6.25rem;
}

.userData {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px dotted #ccc;
}

.userContact {
  display: flex;
}

.userContact a {
  display: inline-block;
  flex: 1;
  text-align: center;
  line-height: 50px;
}

.userContact a:hover {
  color: orange;
}

.userContact a span {
  font-size: 25px;
}

@media screen and (max-width: 768px) {
  .userData {
    display: none;
  }

  .userContact {
    display: none;
  }

  .userInfo {
    position: static;
    width: 100%;
    box-shadow: none;
  }

  .userInfo:hover {
    box-shadow: none;
  }
}
</style>
