<template>
  <nuxt-layout name="default" :user="userState">
    <Banner :height="'50vh'">账户</Banner>
    <nuxt-layout name="account" :active="0" :title="'我的信息'">
      <template #account-wrap>
        <div class="user-setting-wrap">
          <el-form :model="userInfo" ref="form" label-width="100px">
            <el-form-item label="头像:" class="user-avatar">
              <label for="avatar" class="avatar">
                <el-avatar
                  class="changeAvatar"
                  :size="64"
                  :src="userInfo.avatar"
                ></el-avatar>
              </label>
              <input
                type="file"
                @change="updateAvatar"
                accept="image/*"
                name=""
                id="avatar"
                class="hide"
              />
            </el-form-item>
            <el-form-item label="昵称:">
              <el-input
                v-model="userInfo.name"
                placeholder="你的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="我的签名:">
              <el-input
                v-model="userInfo.signature"
                :rows="5"
                resize="none"
                type="textarea"
                placeholder="设置您的签名- ( ゜- ゜)つロ"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio-group v-model="userInfo.sex" size="default">
                <el-radio-button
                  class="user-setting-radio"
                  label="男"
                ></el-radio-button>
                <el-radio-button
                  class="user-setting-radio"
                  label="女"
                ></el-radio-button>
                <el-radio-button
                  class="user-setting-radio"
                  label="保密"
                ></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="user-btn-wrap">
              <div class="padding-dom"></div>
              <div class="user-my-btn">
                <el-button type="primary" size="default" @click="updateHandler"
                  >保存</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup lang="ts">
import type { UserStateType } from "@/types/user";
import { updateUserData } from "~/api/userApi";

useHead({
  title: "我的信息",
});

const userInfo = reactive<UserStateType>(<UserStateType>{
  id: 0,
  avatar:
    "https://img.zcool.cn/community/01c8415b10ec7aa801212d57334fdc.png@1280w_1l_2o_100sh.png",
  name: "",
  signature: "",
  sex: "保密",
});

let userState = await useUserState();
const sexMap: Array<UserStateType["sex"]> = ["保密", "男", "女"];

for (let key in userInfo) {
  if (
    userState.value !== null &&
    userState.value !== undefined &&
    Object.keys(userState.value).includes(key)
  ) {
    (userInfo as any)[key] = (userState.value as any)[key];
  }
  if (key === "sex") {
    userInfo[key] = sexMap[userState.value[key] as unknown as number];
  }
}

// 更新头像
function updateAvatar(event: Event) {
  let file = (event.target as any).files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    if (typeof e.target?.result === "string") {
      userInfo.avatar = e.target.result;
    }
  };
}

async function updateHandler() {
  const formData: object = {};
  // base64转bolb数据
  let blob: Blob = new Blob();
  if (!userInfo.avatar.startsWith("http") && userInfo.avatar !== "") {
    blob = dataURLtoBlob(userInfo.avatar);
  }
  for (let item in userInfo) {
    if (item === "avatar" && blob.size > 0) {
      (formData as any)[item] = blob;
    } else {
      if (item === "sex") {
        (formData as any)[item] = sexMap.findIndex(
          (val) => val === (userInfo as any)[item]
        );
        continue;
      }
      (formData as any)[item] = (userInfo as any)[item];
    }
  }
  console.log(formData);

  let { data } = await updateUserData(formData);
  if (data.value?.code == 1001) {
    // 调用vuex action中 方法 查询用户信息，存入vux
    const userState = await useUserState();
    await keepUserData(userState);
    useMessage({
      message: "修改成功！",
      type: "success",
    });
  } else {
    throw "修改失败";
  }
}

//将base64转换为blob
function dataURLtoBlob(dataurl: string): Blob {
  var arr = dataurl.split(","),
    mime = arr[0]?.match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
</script>

<style scoped>
.account-right .user-setting-wrap .user-setting-radio {
  margin: 0 5px;
}

.account-right
  .user-setting-wrap
  .user-setting-radio
  :deep(.el-radio-button__inner) {
  display: inline-block;
  border: 1px solid #dcdfe6;
  padding: 5px 10px;
  border-radius: var(--el-border-radius-base) !important;
  box-shadow: 0px 0 0 0
    var(--el-radio-button-checked-border-color, var(--el-color-primary));
}

.user-btn-wrap .padding-dom {
  height: 50px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 50px;
}

.user-btn-wrap {
  text-align: center;
}

/* .user-btn-wrap :deep(.el-form-item__content) {
    margin-left: 0 !important;
} */

.user-avatar .avatar span {
  position: relative;
  cursor: pointer;
}

.user-avatar .avatar span:hover::after {
  opacity: 1;
}

.user-avatar .avatar span::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "修改头像";
  width: 100%;
  height: 64px;
  font-size: 12px;
  background-color: rgba(1, 1, 1, 0.5);
  opacity: 0;
  transition: opacity 0.5s;
}

.user-avatar #avatar {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
