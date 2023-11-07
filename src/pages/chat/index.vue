<template>
  <nuxt-layout name="default">
    <Banner :height="'50vh'" :background="background">聊天室</Banner>
    <nuxt-layout name="container" :showUserInfo="false">
      <template #containerLeftMain>
        <client-only>
          <div class="chart" v-if="isLogin">
            <div class="chart-left">
              <UserInfo :user="userData" />
              <div class="chart-list">
                <div class="tip">在线用户列表</div>
                <template v-for="item in userQueue" :key="item?.user?.uid">
                  <div class="chart-list-item">
                    <el-avatar :src="item?.onlineUser?.avatar"></el-avatar>
                    <span class="chart-list-item-name">{{
                      item?.onlineUser?.name
                    }}</span>
                  </div>
                </template>
              </div>
            </div>
            <div class="chart-right">
              <div class="chart-top">
                <span>聊天室</span>
                <span>当前在线({{ userCount }})人</span>
              </div>
              <div class="chart-wrap" ref="chartWrap">
                <template v-for="item in charts" :key="item?.user?.id">
                  <div
                    class="chart-item"
                    :class="{ 'current-user': item?.user?.id === userData?.id }"
                  >
                    <div class="chart-user-avatar">
                      <el-avatar :src="item?.user?.avatar"></el-avatar>
                    </div>
                    <div class="chart-msg">
                      <div class="chart-user-name">
                        <span>{{ item?.user?.name }}</span>
                      </div>
                      <div class="chart-user-msg">
                        <span>{{ item?.msg }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="chart-send">
                <div class="chart-text">
                  <textarea
                    v-model="chartMsg"
                    @keydown.prevent.enter="chartSend"
                    name=""
                    id=""
                    placeholder="请输入……"
                    autofocus
                  ></textarea>
                </div>
                <div class="chart-send-btn">
                  <el-button type="primary" size="small" @click="chartSend"
                    >发送</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </client-only>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount } from "vue";
import { UserStateType } from "~/types/user";
import { ElNotification, ElMessageBox } from "element-plus";
import { io } from "socket.io-client";
const socket = io(useRuntimeConfig().public.socket_url);

useHead({
  title: "聊天室",
});

const background =
  "https://img-baofun.zhhainiao.com/fs/f46d074062d2df78ab46936dbefa39ea.jpg";

const chartMsg = ref<string>("");
const userCount = ref<number>(0);
const charts = ref([]);
const userQueue = ref<Array<any>>([]);
const isLogin = ref<boolean>(false);

const router = useRouter();

const [err, userData] = await useCatch<Ref<UserStateType>>(useUserState());
// const { $socket } = useNuxtApp()

// 用户未登录
if (userData.value) isLogin.value = true;

if (isLogin.value && process.client) {
  socket.on("connect", () => {
    console.log("连接成功");
    socket.emit("userFadeIn", {
      user: userData.value,
      status: "连接",
    });
  });

  // 监听用户状态-
  socket.on("users", (data) => {
    let status = data.currentUser.status == "在线" ? "进入" : "离开";

    ElNotification({
      title: "通知",
      message: "欢迎" + data.currentUser.onlineUser.name + status + "聊天室",
    });
    userQueue.value = data.userQueue;
    userCount.value = data.userQueue.length;
  });

  // 监听消息的回显
  socket.on("chartMsg", (data) => {
    if (data.hasOwnProperty("length")) {
      charts.value = data;
    } else {
      charts.value.push(data);
    }
  });

  // 监听用户离开
  socket.on("userFadeOut", (data) => {
    ElNotification({
      title: "通知",
      message: data.onlineUser.name + "离开了聊天室",
    });
  });

  onBeforeUnmount(() => {
    // 取消事件监听
    socket.removeListener("connect");
    socket.removeListener("users");

    // 断开连接
    socket.disconnect();
  });
} else {
  // 未登录
  ElMessageBox.alert("您还未登录，请先登录再来使用吧~", "消息提示", {
    confirmButtonText: "确认",
    type: "warning",
    callback: () => {
      router.push("/login");
    },
  });
}

const chartSend = () => {
  if (chartMsg.value === "") {
    return;
  }
  // 将聊天信息传送服务器
  socket.emit("chartMsg", {
    user: userData.value,
    msg: chartMsg.value,
  });
  // 清空聊天框
  chartMsg.value = "";
};
</script>

<style scoped>
.chart {
  flex: 0.7;
  display: flex;
  justify-content: space-between;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 50px #fff0f0;
  overflow: hidden;
  --borderColor: #e3e3e3;
  --bgc: #f8f8f8;
}

.chart .chart-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(150deg, #fff1eb 30%, #ace0f9 100%);
}

.chart .chart-left .userInfo {
  position: static;
  background-color: transparent;
  box-shadow: none;
}

.chart .chart-left .userInfo :deep(.userData) {
  display: none;
}

.chart .chart-left .userInfo :deep(.userContact) {
  display: none;
}

.chart .chart-right {
  flex: 3;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
}

.chart .chart-right .chart-top {
  border-bottom: 1px solid var(--borderColor);
  padding: 20px;
  background-color: var(--bgc);
}

.chart .chart-right .chart-top span:last-child {
  margin-left: 15px;
  font-size: 14px;
  color: #666;
}

.chart .chart-right .chart-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
}

.chart .chart-right .chart-wrap .chart-item {
  display: flex;
  margin: 15px 0;
}

/* 当前用户发消息显示在右侧 */
.chart .chart-right .chart-wrap .current-user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chart .chart-right .chart-wrap .chart-item .chart-user-avatar {
  margin-right: 15px;
}

/* 当前用户发消息显示在右侧 */
.chart .chart-right .chart-wrap .current-user .chart-user-avatar {
  margin-right: 0;
  margin-left: 15px;
}

.chart .chart-right .chart-wrap .current-user .chart-user-msg {
  text-align: right;
}

.chart .chart-right .chart-wrap .current-user .chart-user-name {
  text-align: right;
}

.chart .chart-right .chart-wrap .chart-item .chart-user-name {
  margin: 5px 0;
  color: #777;
}

.chart .chart-right .chart-send {
  position: relative;
  border-top: 1px solid var(--borderColor);
  background-color: var(--bgc);
}

.chart .chart-right .chart-send .chart-text textarea {
  display: block;
  width: 100%;
  height: 120px;
  font-size: 16px;
  font-family: tsxmm;
  padding: 5px 0 0 10px;
  resize: none;
  outline: none;
  border: none;
  border-bottom-right-radius: 10px;
}

.chart .chart-right .chart-send .chart-send-btn {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.chart-list {
  flex: 1;
  padding: 5px;
  overflow: auto;
}
.chart-list .tip {
  padding: 0 10px;
}
.chart-list .chart-list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 15px;
}

.chart-list .chart-list-item .chart-list-item-name {
  margin-left: 15px;
  font-size: 16px;
}

@media screen and (max-width: 768px) {
  .chart {
    flex: 0.9;
  }
}
</style>
